import { ClientSession, Document, FilterQuery, Types } from "mongoose";
import BaseRepositoryService, { QueryInfo, RepositoryConfigOptions } from "../../repository";
import PaymentConfig, { PaymentConfigModel } from "./model";
import InvoiceRepository from "../invoice/repository";
import moment from 'moment-jalaali';
import jalaali, { toGregorian, toJalaali, isValidJalaaliDate , isLeapJalaaliYear , jalaaliMonthLength}  from "jalaali-js";
import { ChangeCheckPlaceData, EditCashData, EditCheckData, EditPOSData, EditTransferData } from "../../financeController";


export interface Schedule {
    paymentNumber: number;
    emi: string;
    interest: string;
    principalPayment: string;
    remainingPrincipal: string;
    dueDate: string;
    dueDateGregorian: Date,
    number: number
}

export default class PaymentConfigRepository extends BaseRepositoryService<PaymentConfig>{
    // invoiceRepo : InvoiceRepository
    constructor(options?: RepositoryConfigOptions) {
        super(PaymentConfigModel, options)
        // this.invoiceRepo = new InvoiceRepository(options)
        // this.invoiceRepo = new InvoiceRepository(
   
    }
    convertToJalali(date: string): string {
        return moment(date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
    }

    shamsiToMiladi(year: number, month: number, day: number) {
        const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
        return new Date(gy, gm - 1, gd);
    }

    addDays(date: string, days: number, t: any): string {
        let m = moment(date, 'YYYY-MM-DD');
        m.add(days, t)
        return m.format('YYYY-MM-DD');
    }

    


    insert(document: PaymentConfig, options?: any): Promise<PaymentConfig | any> {
        return super.insert(document, options)
    }


    updatePaymentConfig(
        id: string | Types.ObjectId,
    ) {

    }

    calculateEMIMarket(
        principal: number,
        annualRate: number,
        months: number,
        prePayment: number,
        paymentIntervalDays: number,
        startDate: string,
        period: number = 0
    ) {
        const coefficient = 30 / paymentIntervalDays;
        // const monthlyRate = (annualRate / 100) / (12 * coefficient);
        if (annualRate == 0) {
            var monthlyRate = 0
        }
        else
            var monthlyRate = (annualRate / 100) / (12 * coefficient);

        principal -= prePayment;

        const monthlyInterest = principal * monthlyRate;
        const emi = principal / months + monthlyInterest;

        let remainingPrincipal = principal;
        const schedule: Schedule[] = [];


        for (let i = 1; i <= months; i++) {
            let interest = monthlyInterest;
            let principalPayment = emi - interest;

            remainingPrincipal -= principalPayment;

            let dueDate = "";
            let currentDate = this.convertToJalali(startDate);

            if (paymentIntervalDays % 30 === 0 && paymentIntervalDays >= 30) {
                dueDate = addJalali(currentDate, (paymentIntervalDays / 30) * (i + period), "months");
            } else {
                var now = new Date(startDate);
                now.setDate(now.getDate() + paymentIntervalDays * (i + period));

                dueDate = moment(now).format('jYYYY/jMM/jDD');

            }

            dueDate = dueDate.replace("-", "/")
            dueDate = dueDate.replace("-", "/")

            let dateObjects = dueDate.split("/");
            let dueDateGregorian = this.shamsiToMiladi(parseInt(dateObjects[0]), parseInt(dateObjects[1]), parseInt(dateObjects[2]))
            dueDateGregorian.setDate(dueDateGregorian.getDate() + 1);
            dueDateGregorian.setSeconds(dueDateGregorian.getSeconds() - 1);

            schedule.push({
                paymentNumber: i,
                emi: emi.toFixed(0),
                interest: interest.toFixed(0),
                principalPayment: principalPayment.toFixed(0),
                remainingPrincipal: remainingPrincipal.toFixed(0),
                dueDate: dueDate,
                dueDateGregorian,
                number: i
            });

            currentDate = dueDate;
        }

        return schedule;
    }

    calculateEMI(
        principal: number,
        annualRate: number,
        months: number,
        prePayment: number,
        paymentIntervalDays: number,
        startDate: string,
        period: number = 0
    ) {
        const coefficient = 30 / paymentIntervalDays;
        if (annualRate == 0) {
            var monthlyRate = 0
        }
        else
            var monthlyRate = (annualRate / 100) / (12 * coefficient);

        principal -= prePayment;

        if (monthlyRate == 0)
            var emi = principal
        else
            var emi = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);


        let remainingPrincipal = principal;
        const schedule: Schedule[] = [];


        for (let i = 1; i <= months; i++) {
            const interest = remainingPrincipal * monthlyRate;
            const principalPayment = emi - interest;
            remainingPrincipal -= principalPayment;


            let dueDate = "";
            let currentDate = this.convertToJalali(startDate);

            if (paymentIntervalDays % 30 === 0 && paymentIntervalDays >= 30) {
                dueDate = addJalali(currentDate, (paymentIntervalDays / 30) * (i + period), "months");
            } else {
                var now = new Date(startDate);
                now.setDate(now.getDate() + paymentIntervalDays * (i + period));

                dueDate = moment(now).format('jYYYY/jMM/jDD');

            }
            dueDate = dueDate.replace("-", "/")
            dueDate = dueDate.replace("-", "/")
            let dateObjects = dueDate.split("/");

            let dueDateGregorian = this.shamsiToMiladi(parseInt(dateObjects[0]), parseInt(dateObjects[1]), parseInt(dateObjects[2]))
            dueDateGregorian.setDate(dueDateGregorian.getDate() + 1);
            dueDateGregorian.setSeconds(dueDateGregorian.getSeconds() - 1);

            schedule.push({
                paymentNumber: i,
                emi: emi.toFixed(0),
                interest: interest.toFixed(0),
                principalPayment: principalPayment.toFixed(0),
                remainingPrincipal: remainingPrincipal.toFixed(0),
                dueDate: dueDate,
                dueDateGregorian,
                number: i
            });

            currentDate = dueDate;
        }

        return schedule;
    }


    roundUpToPlace(value: number, places: number): number {
        const factor = Math.pow(10, places);
        return Math.ceil(value / factor) * factor;

    }


    async installmentPaid(id: Types.ObjectId | string, paidAmount: number, fullPaid: boolean) {
        try {
            let paymentConfig = await this.findById(id)
            if (paymentConfig == null) {
                return
            }
            let query: any = {
                $inc: {
                    "installmentConfig.paidAmount": paidAmount
                }
            }
            if (fullPaid) {
                query["$inc"]["installmentConfig.paidCount"] = 1
                query["$inc"]["installmentConfig.remainedPrice"] = -paidAmount
            }

            if (paymentConfig.installmentConfig!.paidCount + 1 == paymentConfig.installmentConfig!.count) {
                query["$set"] = {
                    status: "finished"
                }
            }


            await this.updateOne({
                _id: id,
            }, query)
        } catch (error) {
            throw error
        }
    }

    async forgetPenalty(
        id: string
    ) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    penalty: 0,
                    penaltyForget: true
                }
            })
        } catch (error) {
            throw error
        }
    }


    async transactionPaid(id: string | Types.ObjectId, transactionAmount: number, transactionId: string | Types.ObjectId) {
        try {

        } catch (error) {
            throw error
        }

    }


    async cancelPayment(id: Types.ObjectId) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "canceled"
                }
            })



        } catch (error) {
            throw error
        }
    }



    async confirmPayment(id: string, session: ClientSession) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "finished",
                    "installmentConfig.nextStep": "completed",
                    "installmentConfig.confirmedAt": new Date()
                }
            }, {
                // session,
                runValidators: true
            })
        } catch (error) {
            throw error
        }
    }


    async confirmWarranty(id: string) {
        try {
            const payment = await this.findById(id)
            if (payment == null) {
                throw new Error("پرداخت یافت نشد")
            }

            let nextStep = "finalApproval"
            if (payment.installmentConfig?.payType == "check") {
                nextStep = "checks"
            }


            await this.updateOne({
                _id: id
            }, {
                $set: {
                    "installmentConfig.nextStep": nextStep
                }
            }, {
                runValidators: true
            })
        } catch (error) {
            throw error
        }
    }



    /////////////////////// installment //////////////////////
    async rejectInstallment(
        id: string,
        rejectMessage: string
    ) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "rejected",
                    "installmentConfig.nextStep": "completed",

                    rejectMessage
                }
            })
        } catch (error) {
            throw error
        }
    }



    /////////////////////// installment //////////////////////


    /////////////////////// check //////////////////////

    async makCheckReadyForCancel(id: string) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "readyForCancle"
                }
            })
        } catch (error) {
            throw error
        }
    }
    async acceptCheck(id: string, session: ClientSession) {
        try {
            let payment = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "inproccess",
                }
            }, {
                // session,
                runValidators: true
            })
            if (payment?.replacedFrom != undefined) {
                await this.makCheckReadyForCancel(payment?.replacedFrom as string)
            }
        } catch (error) {
            throw error
        }
    }

    async rejectCheck(
        id: string,
        rejectMessage: string,
        session: ClientSession
    ) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "rejected",
                    rejectMessage
                }
            }, {
                // session,
                runValidators: true
            })
        } catch (error) {
            throw error
        }
    }

    async editCheck(id: string, data: EditCheckData, session: ClientSession) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    deadline: data.deadline,
                    amount: data.amount,
                    "info.number": data.number,
                    "info.saiadNumber": data.saiadNumber,
                    "info.bank": data.bank,
                    "info.branch": data.branch,
                }
            }, {
                // session,
                runValidators: true
            })
        } catch (error) {
            throw error
        }
    }

    async changeCheckPlace(data: ChangeCheckPlaceData, session: ClientSession) {
        try {
            let q: any = {
                $set: {
                    placeType: data.placeType
                }
            }
            if (data.placeType == "in-bank") {
                q["$set"]["bankInfo"] = data.bankInfo
                q["$set"]["bankAccount"] = data.bankInfo?.account
                q["$unset"] = {
                    spendInfo: 1,
                    chest: 1,
                    dein: 1
                }
            }
            else if (data.placeType == "spend") {
                q["$set"]["spendInfo"] = data.spendInfo
                q["$unset"] = {
                    bankInfo: 1,
                    bankAccount: 1,
                    chest: 1,
                    dein: 1
                }
            }
            else if (data.placeType == "in-chest") {
                q["$set"]["chest"] = data.chestId
                q["$unset"] = {
                    bankInfo: 1,
                    bankAccount: 1,
                    spendInfo: 1,
                    dein: 1
                }
            }
            else if (data.placeType == "dein") {
                q["$set"]["dein"] = data.dein
                q["$set"]["bankAccount"] = data.dein?.account
                q["$unset"] = {
                    bankInfo: 1,
                    spendInfo: 1,
                    chest: 1
                }

            }
            await this.findByIdAndUpdate(data.id, q)
        } catch (error) {
            throw error
        }
    }

    async checkPassed(id: string) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "finished",
                    paidAt: new Date(),
                }
            })
        } catch (error) {
            throw error
        }
    }
    async checkReturned(id: string) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "returned",
                }
            })
        } catch (error) {
            throw error
        }
    }

    async confirmCancleAndChangeCheck(id: string) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    codeConfirmed: true
                }
            })
        } catch (error) {
            throw error
        }
    }


    async checkChanged(id: string, paymentConfig: Types.ObjectId, session: ClientSession) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    replacedBy: paymentConfig,
                    status: "waitingForCancle",
                    // trakingCode‍
                }
            })
        } catch (error) {
            throw error
        }
    }


    async submitCheckCancel(id: string) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "ended"
                }
            })
        } catch (error) {
            throw error
        }
    }
    /////////////////////// check //////////////////////


    //////////////////////// cash /////////////////////////
    async acceptCash(id: string, session: ClientSession) {
        try {

            let payment = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "finished",
                    paidAt: new Date()
                }
            }, {
                // session,
                runValidators: true
            })
            if (payment?.replacedFrom != undefined) {
                await this.makCheckReadyForCancel(payment?.replacedFrom as string)
            }
        } catch (error) {
            throw error
        }
    }
    async rejectCash(id: string,
        rejectMessage: string,) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "rejected",
                    rejectMessage
                }
            })
        } catch (error) {
            throw error
        }
    }
    async editCash(id: string, data: EditCashData, session: ClientSession) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    deadline: data.deadline,
                    amount: data.amount,
                }
            }, {
                // session,
                runValidators: true
            })
        } catch (error) {
            throw error
        }
    }
    /////////////////////// cash //////////////////////////


    ////////////////////// pos /////////////////////////
    async acceptPOS(id: string, session: ClientSession) {
        try {


            let payment = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "finished",
                    paidAt: new Date()
                }
            }, {
                // session,
                runValidators: true
            })
            if (payment?.replacedFrom != undefined) {
                await this.makCheckReadyForCancel(payment?.replacedFrom as string)
            }
        } catch (error) {
            throw error
        }
    }

    async rejectPOS(
        id: string,
        rejectMessage: string
    ) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "rejected",
                    rejectMessage
                }
            })
        } catch (error) {
            throw error
        }
    }

    async editPOS(id: string, data: EditPOSData, session: ClientSession) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    deadline: data.deadline,
                    amount: data.amount,
                    "info.pos": data.pos,
                    "info.account": data.bank
                }
            }, {
                // session,
                runValidators: true
            })
        } catch (error) {
            throw error
        }
    }
    ///////////////////// pos /////////////////////////



    ////////////////////// transfer /////////////////////
    async acceptTransfer(id: string, session: ClientSession) {
        try {

            let payment = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "finished",
                    paidAt: new Date()
                }
            }, {
                // session,
                runValidators: true
            })

            if (payment?.replacedFrom != undefined) {
                await this.makCheckReadyForCancel(payment?.replacedFrom as string)
            }
        } catch (error) {
            throw error
        }
    }

    async rejectTransfer(
        id: string,
        rejectMessage: string
    ) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "rejected",
                    rejectMessage
                }
            })
        } catch (error) {
            throw error
        }
    }

    async editTransfer(id: string, data: EditTransferData, session: ClientSession) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    deadline: data.deadline,
                    amount: data.amount,
                    "info.destination": data.destination,
                    "info.code": data.code,
                    "info.source": data.source,

                }
            }, {
                // session,
                runValidators: true
            })
        } catch (error) {
            throw error
        }
    }
    ///////////////////// transfer /////////////////////



}

  
  function getJalaliMonthLength(jy: number, jm: number): number {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;

    return isLeapJalaaliYear(jy) ? 30 : 29;
  }
  
  function addJalaliDays(jy: number, jm: number, jd: number, daysToAdd: number): [number, number, number] {
    let year = jy;
    let month = jm;
    let day = jd + daysToAdd;
  
    while (day > getJalaliMonthLength(year, month)) {
      day -= getJalaliMonthLength(year, month);
      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }
  
    while (day < 1) {
      month--;
      if (month < 1) {
        month = 12;
        year--;
      }
      day += getJalaliMonthLength(year, month);
    }
  
    return [year, month, day];
  }
  
  function addJalaliMonths(jy: number, jm: number, jd: number, monthsToAdd: number): [number, number, number] {
    let year = jy + Math.floor((jm - 1 + monthsToAdd) / 12);
    let month = ((jm - 1 + monthsToAdd) % 12) + 1;
    let day = jd;
  
    const monthLength = getJalaliMonthLength(year, month);
    if (day > monthLength) {
      day = monthLength;
    }
  
    return [year, month, day];
  }
  
  function addJalaliYears(jy: number, jm: number, jd: number, yearsToAdd: number): [number, number, number] {
    let year = jy + yearsToAdd;
    let month = jm;
    let day = jd;
  
    const monthLength = getJalaliMonthLength(year, month);
    if (day > monthLength) {
      day = monthLength;
    }
  
    return [year, month, day];
  }
  
  function pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
  
  function addJalali(date: string, value: number, unit: 'days' | 'months' | 'years'): string {
    const [jy, jm, jd] = date.split(/[-/]/).map(Number);
  
    if (jm < 1 || jm > 12) {
      console.error('ماه نامعتبر:', jm);
      return '';
    }
  
    const monthLength = getJalaliMonthLength(jy, jm);
    if (jd < 1 || jd > monthLength) {
      console.error('روز نامعتبر:', jd);
      return '';
    }
  
    let newDate: [number, number, number];
    if (unit === 'days') {
      newDate = addJalaliDays(jy, jm, jd, value);
    } else if (unit === 'months') {
      newDate = addJalaliMonths(jy, jm, jd, value);
    } else if (unit === 'years') {
      newDate = addJalaliYears(jy, jm, jd, value);
    } else {
      console.error('واحد نامعتبر:', unit);
      return '';
    }
    
    return `${newDate[0]}-${pad(newDate[1])}-${pad(newDate[2])}`;
  }
  