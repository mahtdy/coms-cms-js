--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.account (
    id integer NOT NULL,
    account_number character varying,
    card_number character varying,
    shaba_number character varying,
    bank character varying,
    type character varying,
    title character varying,
    is_actvie boolean,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.account OWNER TO mahtdy;

--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_id_seq OWNER TO mahtdy;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.account_id_seq OWNED BY public.account.id;


--
-- Name: bank_check; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.bank_check (
    id integer NOT NULL,
    order_id integer,
    account_id integer,
    amount character varying,
    number character varying,
    account_number character varying,
    due_date timestamp without time zone,
    bank character varying,
    owner character varying,
    status character varying,
    image character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    user_id character varying,
    manager_id character varying,
    is_accept character varying,
    type_id character varying,
    is_add_transaction character varying,
    status_id timestamp without time zone,
    is_add_wallet character varying
);


ALTER TABLE public.bank_check OWNER TO mahtdy;

--
-- Name: bank_check_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.bank_check_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bank_check_id_seq OWNER TO mahtdy;

--
-- Name: bank_check_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.bank_check_id_seq OWNED BY public.bank_check.id;


--
-- Name: bank_receipt; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.bank_receipt (
    id integer NOT NULL,
    order_id integer,
    account_id integer,
    amount character varying,
    number character varying,
    due_date timestamp without time zone,
    account_number character varying,
    image character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    user_id character varying,
    manager_id character varying,
    is_accept character varying,
    type_id character varying,
    is_add_transaction character varying,
    is_add_wallet character varying
);


ALTER TABLE public.bank_receipt OWNER TO mahtdy;

--
-- Name: bank_receipt_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.bank_receipt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bank_receipt_id_seq OWNER TO mahtdy;

--
-- Name: bank_receipt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.bank_receipt_id_seq OWNED BY public.bank_receipt.id;


--
-- Name: basket; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.basket (
    id integer NOT NULL,
    product_id integer,
    product_price_id integer,
    warehouse_id integer,
    user_id character varying,
    type_user_id character varying,
    inserted_at timestamp without time zone,
    finished_at timestamp without time zone,
    number integer,
    per_price double precision,
    send_by character varying,
    next_buy boolean,
    order_status character varying(255)
);


ALTER TABLE public.basket OWNER TO mahtdy;

--
-- Name: basket_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.basket_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.basket_id_seq OWNER TO mahtdy;

--
-- Name: basket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.basket_id_seq OWNED BY public.basket.id;


--
-- Name: brand; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.brand (
    id integer NOT NULL,
    title character varying,
    title_en character varying,
    logo character varying,
    alt_logo character varying,
    description character varying,
    video character varying,
    url character varying,
    deleted_at timestamp without time zone,
    inserted_at timestamp without time zone,
    percentage_floor double precision,
    percentage_ceiling double precision,
    publishdate timestamp without time zone,
    isdraft character varying,
    language character varying,
    viewmode character varying,
    seo character varying,
    refrence_id character varying,
    is_seo_url_ok boolean,
    seo_url_last_response character varying(5000),
    seo_id character varying(500)
);


ALTER TABLE public.brand OWNER TO mahtdy;

--
-- Name: brand_category; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.brand_category (
    id integer NOT NULL,
    brand_id integer,
    category timestamp without time zone,
    inserted_at timestamp without time zone
);


ALTER TABLE public.brand_category OWNER TO mahtdy;

--
-- Name: brand_category_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.brand_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brand_category_id_seq OWNER TO mahtdy;

--
-- Name: brand_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.brand_category_id_seq OWNED BY public.brand_category.id;


--
-- Name: brand_feature; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.brand_feature (
    id integer NOT NULL,
    brand_id integer,
    feature_id integer,
    feature_value_id integer,
    sort_id_feature integer,
    sort_id_feature_value integer
);


ALTER TABLE public.brand_feature OWNER TO mahtdy;

--
-- Name: brand_feature_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.brand_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brand_feature_id_seq OWNER TO mahtdy;

--
-- Name: brand_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.brand_feature_id_seq OWNED BY public.brand_feature.id;


--
-- Name: brand_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brand_id_seq OWNER TO mahtdy;

--
-- Name: brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.brand_id_seq OWNED BY public.brand.id;


--
-- Name: brand_image; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.brand_image (
    id integer NOT NULL,
    brand_id integer,
    url character varying,
    alt character varying,
    deleted_at timestamp without time zone,
    inserted_at timestamp without time zone
);


ALTER TABLE public.brand_image OWNER TO mahtdy;

--
-- Name: brand_image_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.brand_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brand_image_id_seq OWNER TO mahtdy;

--
-- Name: brand_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.brand_image_id_seq OWNED BY public.brand_image.id;


--
-- Name: category_brand; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.category_brand (
    id integer NOT NULL,
    brand_id integer,
    category_id character varying,
    sort_id character varying
);


ALTER TABLE public.category_brand OWNER TO mahtdy;

--
-- Name: category_brand_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.category_brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_brand_id_seq OWNER TO mahtdy;

--
-- Name: category_brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.category_brand_id_seq OWNED BY public.category_brand.id;


--
-- Name: category_brand_price; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.category_brand_price (
    id integer NOT NULL,
    brand_id integer,
    category character varying,
    prcentage_floor double precision,
    prcentage_ceiling double precision
);


ALTER TABLE public.category_brand_price OWNER TO mahtdy;

--
-- Name: category_brand_price_action; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.category_brand_price_action (
    id integer NOT NULL,
    category_id character varying,
    is_increase boolean,
    percentage double precision,
    brand_id integer,
    created_at timestamp(6) without time zone,
    self_id integer
);


ALTER TABLE public.category_brand_price_action OWNER TO mahtdy;

--
-- Name: category_brand_price_action_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

ALTER TABLE public.category_brand_price_action ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.category_brand_price_action_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: category_brand_price_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.category_brand_price_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_brand_price_id_seq OWNER TO mahtdy;

--
-- Name: category_brand_price_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.category_brand_price_id_seq OWNED BY public.category_brand_price.id;


--
-- Name: category_feature; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.category_feature (
    id integer NOT NULL,
    feature_id integer,
    category_id character varying,
    sort_id character varying
);


ALTER TABLE public.category_feature OWNER TO mahtdy;

--
-- Name: category_feature_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.category_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_feature_id_seq OWNER TO mahtdy;

--
-- Name: category_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.category_feature_id_seq OWNED BY public.category_feature.id;


--
-- Name: category_list; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.category_list (
    id integer NOT NULL,
    product_id integer,
    category_id character varying,
    order_num integer
);


ALTER TABLE public.category_list OWNER TO mahtdy;

--
-- Name: category_list_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.category_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_list_id_seq OWNER TO mahtdy;

--
-- Name: category_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.category_list_id_seq OWNED BY public.category_list.id;


--
-- Name: category_rate; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.category_rate (
    id integer NOT NULL,
    rate_id integer,
    category_id character varying,
    order_num character varying
);


ALTER TABLE public.category_rate OWNER TO mahtdy;

--
-- Name: category_rate_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.category_rate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_rate_id_seq OWNER TO mahtdy;

--
-- Name: category_rate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.category_rate_id_seq OWNED BY public.category_rate.id;


--
-- Name: cheque; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.cheque (
    id integer NOT NULL,
    order_id integer,
    warehouse_id integer,
    warehouse_manager_id character varying,
    title character varying,
    code character varying,
    receive_at timestamp without time zone,
    created_at timestamp without time zone,
    description character varying,
    deleted_at timestamp without time zone,
    type character varying,
    type_id character varying
);


ALTER TABLE public.cheque OWNER TO mahtdy;

--
-- Name: cheque_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.cheque_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cheque_id_seq OWNER TO mahtdy;

--
-- Name: cheque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.cheque_id_seq OWNED BY public.cheque.id;


--
-- Name: cheque_transfer_product; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.cheque_transfer_product (
    id integer NOT NULL,
    product_id integer,
    order_id integer,
    unit_id integer,
    warehouse_id integer,
    wastage_id integer,
    cheque_id integer,
    transfer_id integer,
    stock_taking_product_id integer,
    number bigint,
    description character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    is_increase boolean,
    type character varying,
    refrence_id character varying
);


ALTER TABLE public.cheque_transfer_product OWNER TO mahtdy;

--
-- Name: cheque_transfer_product_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.cheque_transfer_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cheque_transfer_product_id_seq OWNER TO mahtdy;

--
-- Name: cheque_transfer_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.cheque_transfer_product_id_seq OWNED BY public.cheque_transfer_product.id;


--
-- Name: credit; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.credit (
    id integer NOT NULL,
    amount character varying,
    due_date timestamp without time zone,
    user_id character varying,
    manager_id character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    left_over character varying
);


ALTER TABLE public.credit OWNER TO mahtdy;

--
-- Name: credit_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.credit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credit_id_seq OWNER TO mahtdy;

--
-- Name: credit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.credit_id_seq OWNED BY public.credit.id;


--
-- Name: database_log; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.database_log (
    id integer NOT NULL,
    created_at timestamp without time zone,
    class_name character varying,
    func_name character varying,
    error character varying,
    arg character varying,
    kwargs character varying,
    befor_data character varying,
    after_data character varying,
    type_query character varying,
    username character varying,
    result character varying,
    code character varying
);


ALTER TABLE public.database_log OWNER TO mahtdy;

--
-- Name: database_log_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.database_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.database_log_id_seq OWNER TO mahtdy;

--
-- Name: database_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.database_log_id_seq OWNED BY public.database_log.id;


--
-- Name: discount_calander; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.discount_calander (
    id integer NOT NULL,
    name character varying,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    landing_page_url character varying,
    num_user_can_buy character varying,
    num_product_salse character varying,
    num_product character varying,
    minimum_basket_price character varying,
    maximum_apply_discount character varying,
    is_finished character varying,
    is_actice character varying,
    inserted_at timestamp without time zone,
    deleted_at timestamp without time zone,
    num_total_use character varying,
    num_per_session character varying,
    prevent_losses character varying
);


ALTER TABLE public.discount_calander OWNER TO mahtdy;

--
-- Name: discount_calander_banner; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.discount_calander_banner (
    id integer NOT NULL,
    discount_calander_id integer,
    url character varying,
    alt character varying,
    page_refer character varying
);


ALTER TABLE public.discount_calander_banner OWNER TO mahtdy;

--
-- Name: discount_calander_banner_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.discount_calander_banner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_calander_banner_id_seq OWNER TO mahtdy;

--
-- Name: discount_calander_banner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.discount_calander_banner_id_seq OWNED BY public.discount_calander_banner.id;


--
-- Name: discount_calander_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.discount_calander_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_calander_id_seq OWNER TO mahtdy;

--
-- Name: discount_calander_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.discount_calander_id_seq OWNED BY public.discount_calander.id;


--
-- Name: discount_calander_list; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.discount_calander_list (
    id integer NOT NULL,
    discount_calander_id integer,
    discount_price character varying,
    discount_precentage character varying,
    percentage_up character varying,
    percentage_down character varying,
    price_up character varying,
    price_down character varying,
    wich_one character varying
);


ALTER TABLE public.discount_calander_list OWNER TO mahtdy;

--
-- Name: discount_calander_list_banner_category; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.discount_calander_list_banner_category (
    id integer NOT NULL,
    discount_calander_list_id integer,
    brand_id integer,
    category_id timestamp without time zone
);


ALTER TABLE public.discount_calander_list_banner_category OWNER TO mahtdy;

--
-- Name: discount_calander_list_banner_category_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.discount_calander_list_banner_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_calander_list_banner_category_id_seq OWNER TO mahtdy;

--
-- Name: discount_calander_list_banner_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.discount_calander_list_banner_category_id_seq OWNED BY public.discount_calander_list_banner_category.id;


--
-- Name: discount_calander_list_codes; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.discount_calander_list_codes (
    id integer NOT NULL,
    discount_calander_list_id integer,
    code character varying
);


ALTER TABLE public.discount_calander_list_codes OWNER TO mahtdy;

--
-- Name: discount_calander_list_codes_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.discount_calander_list_codes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_calander_list_codes_id_seq OWNER TO mahtdy;

--
-- Name: discount_calander_list_codes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.discount_calander_list_codes_id_seq OWNED BY public.discount_calander_list_codes.id;


--
-- Name: discount_calander_list_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.discount_calander_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_calander_list_id_seq OWNER TO mahtdy;

--
-- Name: discount_calander_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.discount_calander_list_id_seq OWNED BY public.discount_calander_list.id;


--
-- Name: discount_calander_msg; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.discount_calander_msg (
    id integer NOT NULL,
    discount_calander_id integer,
    name character varying,
    send_date timestamp without time zone,
    text character varying
);


ALTER TABLE public.discount_calander_msg OWNER TO mahtdy;

--
-- Name: discount_calander_msg_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.discount_calander_msg_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_calander_msg_id_seq OWNER TO mahtdy;

--
-- Name: discount_calander_msg_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.discount_calander_msg_id_seq OWNED BY public.discount_calander_msg.id;


--
-- Name: discount_calander_msg_media; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.discount_calander_msg_media (
    id integer NOT NULL,
    discount_calander_msg_id integer,
    url character varying,
    type character varying
);


ALTER TABLE public.discount_calander_msg_media OWNER TO mahtdy;

--
-- Name: discount_calander_msg_media_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.discount_calander_msg_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_calander_msg_media_id_seq OWNER TO mahtdy;

--
-- Name: discount_calander_msg_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.discount_calander_msg_media_id_seq OWNED BY public.discount_calander_msg_media.id;


--
-- Name: discount_calander_msg_reciever; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.discount_calander_msg_reciever (
    id integer NOT NULL,
    discount_calander_msg_id integer,
    reciever character varying
);


ALTER TABLE public.discount_calander_msg_reciever OWNER TO mahtdy;

--
-- Name: discount_calander_msg_reciever_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.discount_calander_msg_reciever_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.discount_calander_msg_reciever_id_seq OWNER TO mahtdy;

--
-- Name: discount_calander_msg_reciever_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.discount_calander_msg_reciever_id_seq OWNED BY public.discount_calander_msg_reciever.id;


--
-- Name: error_log; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.error_log (
    id integer NOT NULL,
    created_at timestamp without time zone,
    class_name character varying,
    func_name character varying,
    error character varying,
    arg character varying,
    kwargs character varying,
    count character varying,
    last_record character varying
);


ALTER TABLE public.error_log OWNER TO mahtdy;

--
-- Name: error_log_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.error_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.error_log_id_seq OWNER TO mahtdy;

--
-- Name: error_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.error_log_id_seq OWNED BY public.error_log.id;


--
-- Name: facktor_info; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.facktor_info (
    id integer NOT NULL,
    order_id integer,
    type character varying,
    value character varying,
    key character varying
);


ALTER TABLE public.facktor_info OWNER TO mahtdy;

--
-- Name: facktor_info_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.facktor_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.facktor_info_id_seq OWNER TO mahtdy;

--
-- Name: facktor_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.facktor_info_id_seq OWNED BY public.facktor_info.id;


--
-- Name: feature; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.feature (
    id integer NOT NULL,
    title character varying,
    show_up boolean,
    inserted_at timestamp without time zone,
    deleted_at timestamp without time zone,
    language character varying
);


ALTER TABLE public.feature OWNER TO mahtdy;

--
-- Name: feature_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feature_id_seq OWNER TO mahtdy;

--
-- Name: feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.feature_id_seq OWNED BY public.feature.id;


--
-- Name: feature_value; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.feature_value (
    id integer NOT NULL,
    value character varying,
    language character varying(255)
);


ALTER TABLE public.feature_value OWNER TO mahtdy;

--
-- Name: feature_value_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.feature_value_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feature_value_id_seq OWNER TO mahtdy;

--
-- Name: feature_value_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.feature_value_id_seq OWNED BY public.feature_value.id;


--
-- Name: feature_values_category; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.feature_values_category (
    id integer NOT NULL,
    feature_value_id integer,
    feature_id integer,
    category_id character varying,
    is_filter boolean,
    inserted_at timestamp without time zone,
    deleted_at timestamp without time zone,
    feature_sort_id integer,
    language character varying,
    feature_value_sort_id integer
);


ALTER TABLE public.feature_values_category OWNER TO mahtdy;

--
-- Name: feature_values_category_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.feature_values_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feature_values_category_id_seq OWNER TO mahtdy;

--
-- Name: feature_values_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.feature_values_category_id_seq OWNED BY public.feature_values_category.id;


--
-- Name: financial_document; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.financial_document (
    id integer NOT NULL,
    order_id integer,
    account_id integer,
    wallet_id integer,
    transaction_id integer,
    withdraw_wallet_id integer,
    text character varying,
    user_id character varying,
    amount character varying,
    account_number_orgin character varying,
    account_number_goal character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    is_pattern timestamp without time zone,
    type_id character varying,
    type_peyment character varying,
    peyment_getway_id character varying
);


ALTER TABLE public.financial_document OWNER TO mahtdy;

--
-- Name: financial_document_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.financial_document_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.financial_document_id_seq OWNER TO mahtdy;

--
-- Name: financial_document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.financial_document_id_seq OWNED BY public.financial_document.id;


--
-- Name: giftcard; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.giftcard (
    id integer NOT NULL,
    code character varying,
    receiver character varying,
    amount character varying,
    creator timestamp without time zone,
    inserted_at timestamp without time zone,
    is_use character varying,
    name character varying,
    card_url character varying
);


ALTER TABLE public.giftcard OWNER TO mahtdy;

--
-- Name: giftcard_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.giftcard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.giftcard_id_seq OWNER TO mahtdy;

--
-- Name: giftcard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.giftcard_id_seq OWNED BY public.giftcard.id;


--
-- Name: holding_hands; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.holding_hands (
    id integer NOT NULL,
    order_id integer,
    account_id integer,
    amount character varying,
    payer character varying,
    user_id_receiver character varying,
    account_number character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    type_id character varying,
    is_add_transaction character varying,
    is_add_wallet character varying,
    is_transfer character varying
);


ALTER TABLE public.holding_hands OWNER TO mahtdy;

--
-- Name: holding_hands_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.holding_hands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.holding_hands_id_seq OWNER TO mahtdy;

--
-- Name: holding_hands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.holding_hands_id_seq OWNED BY public.holding_hands.id;


--
-- Name: log_price_action; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.log_price_action (
    id integer NOT NULL,
    category_brand_price_action_id integer,
    action character varying(255),
    product_price_id integer,
    created_at timestamp(6) without time zone,
    workmate double precision,
    sell double precision,
    sell_ceiling double precision,
    sell_floor double precision
);


ALTER TABLE public.log_price_action OWNER TO mahtdy;

--
-- Name: log_price_action_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

ALTER TABLE public.log_price_action ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.log_price_action_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: my_order; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.my_order (
    id integer NOT NULL,
    account_id integer,
    transaction_at timestamp without time zone,
    due_date timestamp without time zone,
    user_id character varying(255),
    factor_code character varying(255),
    factor_image character varying(255),
    title character varying(255),
    finall_transportation bigint,
    finall_price bigint,
    finall_gain bigint,
    finall_tax bigint,
    general_gain bigint,
    total_price bigint,
    orders_status character varying(255),
    peyment_status character varying(255),
    type character varying(255),
    payment_type character varying(255),
    orders_code character varying(255),
    number character varying(255),
    created_at timestamp without time zone,
    code character varying(255),
    is_increase_financial_balance boolean,
    type_id character varying(255),
    deleted_at timestamp without time zone,
    send_status character varying(255),
    is_close boolean
);


ALTER TABLE public.my_order OWNER TO mahtdy;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO mahtdy;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.order_id_seq OWNED BY public.my_order.id;


--
-- Name: order_products; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.order_products (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    order_send_id character varying,
    unit_price integer,
    num integer,
    total_price integer,
    gain integer,
    send_by character varying,
    tax integer,
    description character varying,
    is_increase_balance character varying,
    gain_percentage integer,
    tax_percentage integer,
    deleted_at timestamp without time zone,
    refrence_id character varying
);


ALTER TABLE public.order_products OWNER TO mahtdy;

--
-- Name: order_products_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.order_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_products_id_seq OWNER TO mahtdy;

--
-- Name: order_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.order_products_id_seq OWNED BY public.order_products.id;


--
-- Name: order_send; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.order_send (
    id integer NOT NULL,
    order_id integer,
    sending_type character varying,
    pursuit_code character varying,
    recieve_date timestamp without time zone,
    sending_price character varying,
    recieve_code character varying,
    recieve_start_time character varying,
    recieve_end_time character varying,
    total_price character varying
);


ALTER TABLE public.order_send OWNER TO mahtdy;

--
-- Name: order_send_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.order_send_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_send_id_seq OWNER TO mahtdy;

--
-- Name: order_send_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.order_send_id_seq OWNED BY public.order_send.id;


--
-- Name: order_type; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.order_type (
    id integer NOT NULL,
    type_name character varying,
    increase_balance boolean,
    increase_financial_balance boolean,
    description character varying(255),
    type_id integer
);


ALTER TABLE public.order_type OWNER TO mahtdy;

--
-- Name: order_type_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.order_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_type_id_seq OWNER TO mahtdy;

--
-- Name: order_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.order_type_id_seq OWNED BY public.order_type.id;


--
-- Name: pos; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.pos (
    id integer NOT NULL,
    account_id integer,
    name character varying,
    account_bank character varying,
    account_number character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.pos OWNER TO mahtdy;

--
-- Name: pos_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.pos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pos_id_seq OWNER TO mahtdy;

--
-- Name: pos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.pos_id_seq OWNED BY public.pos.id;


--
-- Name: pos_transactions; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.pos_transactions (
    id integer NOT NULL,
    pos_id integer,
    account_id integer,
    order_id character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    account_number character varying,
    user_id character varying,
    type_id character varying,
    is_add_transaction character varying,
    is_add_wallet character varying,
    amount character varying
);


ALTER TABLE public.pos_transactions OWNER TO mahtdy;

--
-- Name: pos_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.pos_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pos_transactions_id_seq OWNER TO mahtdy;

--
-- Name: pos_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.pos_transactions_id_seq OWNED BY public.pos_transactions.id;


--
-- Name: poz_transactions; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.poz_transactions (
    id integer NOT NULL,
    pos_id integer,
    account_id integer,
    order_id character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    account_number character varying,
    user_id character varying,
    type_id character varying,
    is_add_transaction character varying,
    is_add_wallet character varying,
    poz_id character varying,
    amount character varying
);


ALTER TABLE public.poz_transactions OWNER TO mahtdy;

--
-- Name: poz_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.poz_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.poz_transactions_id_seq OWNER TO mahtdy;

--
-- Name: poz_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.poz_transactions_id_seq OWNED BY public.poz_transactions.id;


--
-- Name: price_config_term; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.price_config_term (
    id integer NOT NULL,
    config character varying
);


ALTER TABLE public.price_config_term OWNER TO mahtdy;

--
-- Name: price_config_term_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.price_config_term_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.price_config_term_id_seq OWNER TO mahtdy;

--
-- Name: price_config_term_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.price_config_term_id_seq OWNED BY public.price_config_term.id;


--
-- Name: price_feature_values; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.price_feature_values (
    id integer NOT NULL,
    feature_id integer,
    feature_value_id integer,
    product_price_id integer
);


ALTER TABLE public.price_feature_values OWNER TO mahtdy;

--
-- Name: price_feature_values_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.price_feature_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.price_feature_values_id_seq OWNER TO mahtdy;

--
-- Name: price_feature_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.price_feature_values_id_seq OWNED BY public.price_feature_values.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.product (
    id integer NOT NULL,
    brand_id integer,
    unit_id integer,
    category character varying(6),
    model character varying,
    title character varying,
    point character varying,
    weight character varying,
    weight_unit integer,
    width character varying,
    width_unit integer,
    height character varying,
    height_unit integer,
    depth character varying,
    depth_unit integer,
    title_en character varying,
    status character varying,
    code character varying,
    inserted_at timestamp without time zone,
    deleted_at timestamp without time zone,
    user_id character varying,
    url character varying,
    visit character varying,
    popular character varying,
    sales_number character varying,
    final_price character varying,
    final_balance character varying,
    maximum_in_order character varying,
    refrence_id character varying,
    comment_status character varying,
    language character varying,
    viewmode character varying,
    seo character varying,
    publishdate timestamp without time zone,
    isdraft boolean,
    is_seo_url_ok boolean,
    seo_url_last_response character varying(5000),
    seo_id character varying(5000),
    question character varying(5000),
    view integer,
    "viewCategory" character varying(255),
    "questionOppened" character varying(255)
);


ALTER TABLE public.product OWNER TO mahtdy;

--
-- Name: product_barcode; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.product_barcode (
    id integer NOT NULL,
    product_id integer,
    value character varying,
    key character varying,
    refrence_id character varying
);


ALTER TABLE public.product_barcode OWNER TO mahtdy;

--
-- Name: product_barcode_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.product_barcode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_barcode_id_seq OWNER TO mahtdy;

--
-- Name: product_barcode_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.product_barcode_id_seq OWNED BY public.product_barcode.id;


--
-- Name: product_feature_values; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.product_feature_values (
    id integer NOT NULL,
    product_id integer,
    feature_id integer,
    refrence_id character varying,
    feature_value_id integer
);


ALTER TABLE public.product_feature_values OWNER TO mahtdy;

--
-- Name: product_feature_values_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.product_feature_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_feature_values_id_seq OWNER TO mahtdy;

--
-- Name: product_feature_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.product_feature_values_id_seq OWNED BY public.product_feature_values.id;


--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO mahtdy;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: product_images; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.product_images (
    id integer NOT NULL,
    product_id integer,
    url character varying,
    alt character varying,
    color character varying,
    deleted_at timestamp without time zone,
    inserted_at timestamp without time zone,
    type_media character varying
);


ALTER TABLE public.product_images OWNER TO mahtdy;

--
-- Name: product_images_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_images_id_seq OWNER TO mahtdy;

--
-- Name: product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images.id;


--
-- Name: product_price; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.product_price (
    id integer NOT NULL,
    product_id integer,
    order_id integer,
    unit_id integer,
    buy double precision,
    workmate double precision,
    sell_ceiling double precision,
    sell_floor double precision,
    sell_ai double precision,
    percentage_ceiling double precision,
    percentage_floor double precision,
    percentage_ai double precision,
    balance double precision,
    sell double precision,
    is_active boolean,
    inserted_at timestamp without time zone,
    seller_id integer,
    guaranty_id integer,
    refrence_id character varying
);


ALTER TABLE public.product_price OWNER TO mahtdy;

--
-- Name: product_price_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.product_price_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_price_id_seq OWNER TO mahtdy;

--
-- Name: product_price_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.product_price_id_seq OWNED BY public.product_price.id;


--
-- Name: product_rate; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.product_rate (
    id integer NOT NULL,
    product_id integer,
    rate_id integer,
    refrence_id character varying
);


ALTER TABLE public.product_rate OWNER TO mahtdy;

--
-- Name: product_rate_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.product_rate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_rate_id_seq OWNER TO mahtdy;

--
-- Name: product_rate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.product_rate_id_seq OWNED BY public.product_rate.id;


--
-- Name: rate; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.rate (
    id integer NOT NULL,
    title character varying
);


ALTER TABLE public.rate OWNER TO mahtdy;

--
-- Name: rate_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.rate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rate_id_seq OWNER TO mahtdy;

--
-- Name: rate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.rate_id_seq OWNED BY public.rate.id;


--
-- Name: review; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.review (
    id integer NOT NULL,
    product_id integer,
    title character varying,
    text character varying,
    user_id character varying,
    inserted_at timestamp without time zone,
    deleted_at timestamp without time zone,
    refrence_id character varying
);


ALTER TABLE public.review OWNER TO mahtdy;

--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_id_seq OWNER TO mahtdy;

--
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.review_id_seq OWNED BY public.review.id;


--
-- Name: stock_taking; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.stock_taking (
    id integer NOT NULL,
    warehouse_id integer,
    warehouse_manager_id character varying,
    code character varying,
    description character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.stock_taking OWNER TO mahtdy;

--
-- Name: stock_taking_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.stock_taking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_taking_id_seq OWNER TO mahtdy;

--
-- Name: stock_taking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.stock_taking_id_seq OWNED BY public.stock_taking.id;


--
-- Name: stock_taking_product; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.stock_taking_product (
    id integer NOT NULL,
    current_balance integer,
    counting_one integer,
    counting_second integer,
    counting_third integer,
    counting_final integer,
    description character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    refrence_id character varying,
    stock_taking_id integer,
    product_id integer
);


ALTER TABLE public.stock_taking_product OWNER TO mahtdy;

--
-- Name: stock_taking_product_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.stock_taking_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stock_taking_product_id_seq OWNER TO mahtdy;

--
-- Name: stock_taking_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.stock_taking_product_id_seq OWNED BY public.stock_taking_product.id;


--
-- Name: task_queue; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.task_queue (
    id integer NOT NULL,
    date timestamp without time zone,
    hour integer,
    miunte integer,
    args character varying,
    kwargs character varying,
    status character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    class_name character varying(255),
    function_name character varying(255),
    response_error character varying(5000)
);


ALTER TABLE public.task_queue OWNER TO mahtdy;

--
-- Name: task_queue_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.task_queue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_queue_id_seq OWNER TO mahtdy;

--
-- Name: task_queue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.task_queue_id_seq OWNED BY public.task_queue.id;


--
-- Name: transaction; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    order_id integer,
    account_id integer,
    wallet_id integer,
    pos_id integer,
    account_number_origin character varying,
    account_card_origin character varying,
    account_shaba_origin character varying,
    account_number_goal character varying,
    account_card_goal character varying,
    account_shaba_goal character varying,
    amount character varying,
    peyment_getway_id character varying,
    type_manual character varying,
    id_manual character varying,
    status character varying,
    type_id character varying,
    created_at timestamp without time zone,
    transfer_at timestamp without time zone,
    deleted_at timestamp without time zone,
    user_id character varying,
    status_id integer
);


ALTER TABLE public.transaction OWNER TO mahtdy;

--
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_id_seq OWNER TO mahtdy;

--
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- Name: transfer; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.transfer (
    id integer NOT NULL,
    warehouse_origin_id character varying,
    warehouse_manager_origin_id character varying,
    code character varying,
    title character varying,
    warehouse_goal_id character varying,
    warehouse_manager_goal_id character varying,
    created_at timestamp without time zone,
    submit_at timestamp without time zone,
    receive_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.transfer OWNER TO mahtdy;

--
-- Name: transfer_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.transfer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transfer_id_seq OWNER TO mahtdy;

--
-- Name: transfer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.transfer_id_seq OWNED BY public.transfer.id;


--
-- Name: unit; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.unit (
    id integer NOT NULL,
    title character varying,
    language character varying(255)
);


ALTER TABLE public.unit OWNER TO mahtdy;

--
-- Name: unit_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.unit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.unit_id_seq OWNER TO mahtdy;

--
-- Name: unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.unit_id_seq OWNED BY public.unit.id;


--
-- Name: wallet; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.wallet (
    id integer NOT NULL,
    order_id integer,
    transaction_id integer,
    user_id character varying,
    amount character varying,
    is_increase boolean,
    type_id character varying,
    table_name character varying,
    table_id character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    is_real character varying,
    gift_reminder character varying
);


ALTER TABLE public.wallet OWNER TO mahtdy;

--
-- Name: wallet_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.wallet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wallet_id_seq OWNER TO mahtdy;

--
-- Name: wallet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.wallet_id_seq OWNED BY public.wallet.id;


--
-- Name: warehouse; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.warehouse (
    id integer NOT NULL,
    title character varying(255),
    height character varying(255),
    dimension character varying(255),
    address character varying(255),
    postal_code character varying(255),
    x_location character varying(255),
    y_location character varying(255),
    inserted_at timestamp(6) without time zone,
    deleted_at timestamp without time zone,
    is_active boolean
);


ALTER TABLE public.warehouse OWNER TO mahtdy;

--
-- Name: warehouse_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.warehouse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.warehouse_id_seq OWNER TO mahtdy;

--
-- Name: warehouse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.warehouse_id_seq OWNED BY public.warehouse.id;


--
-- Name: warehouse_managers; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.warehouse_managers (
    id integer NOT NULL,
    warehouse_id integer,
    manager_id character varying
);


ALTER TABLE public.warehouse_managers OWNER TO mahtdy;

--
-- Name: warehouse_managers_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.warehouse_managers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.warehouse_managers_id_seq OWNER TO mahtdy;

--
-- Name: warehouse_managers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.warehouse_managers_id_seq OWNED BY public.warehouse_managers.id;


--
-- Name: warehouse_phones; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.warehouse_phones (
    id integer NOT NULL,
    warehouse_id character varying,
    phone character varying
);


ALTER TABLE public.warehouse_phones OWNER TO mahtdy;

--
-- Name: warehouse_phones_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.warehouse_phones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.warehouse_phones_id_seq OWNER TO mahtdy;

--
-- Name: warehouse_phones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.warehouse_phones_id_seq OWNED BY public.warehouse_phones.id;


--
-- Name: wastage; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.wastage (
    id integer NOT NULL,
    unit_id integer,
    warehouse_id integer,
    product_id integer,
    warehouse_manager_id character varying,
    number bigint,
    description character varying,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone,
    refrence_id character varying
);


ALTER TABLE public.wastage OWNER TO mahtdy;

--
-- Name: wastage_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.wastage_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.wastage_id_seq OWNER TO mahtdy;

--
-- Name: wastage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.wastage_id_seq OWNED BY public.wastage.id;


--
-- Name: withdraw_wallet; Type: TABLE; Schema: public; Owner: mahtdy
--

CREATE TABLE public.withdraw_wallet (
    id integer NOT NULL,
    account_id integer,
    user_id character varying,
    amount character varying,
    created_at timestamp without time zone,
    status character varying,
    account_number character varying,
    account_card character varying,
    account_shaba character varying
);


ALTER TABLE public.withdraw_wallet OWNER TO mahtdy;

--
-- Name: withdraw_wallet_id_seq; Type: SEQUENCE; Schema: public; Owner: mahtdy
--

CREATE SEQUENCE public.withdraw_wallet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.withdraw_wallet_id_seq OWNER TO mahtdy;

--
-- Name: withdraw_wallet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mahtdy
--

ALTER SEQUENCE public.withdraw_wallet_id_seq OWNED BY public.withdraw_wallet.id;


--
-- Name: account id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.account_id_seq'::regclass);


--
-- Name: bank_check id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.bank_check ALTER COLUMN id SET DEFAULT nextval('public.bank_check_id_seq'::regclass);


--
-- Name: bank_receipt id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.bank_receipt ALTER COLUMN id SET DEFAULT nextval('public.bank_receipt_id_seq'::regclass);


--
-- Name: basket id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.basket ALTER COLUMN id SET DEFAULT nextval('public.basket_id_seq'::regclass);


--
-- Name: brand id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand ALTER COLUMN id SET DEFAULT nextval('public.brand_id_seq'::regclass);


--
-- Name: brand_category id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_category ALTER COLUMN id SET DEFAULT nextval('public.brand_category_id_seq'::regclass);


--
-- Name: brand_feature id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_feature ALTER COLUMN id SET DEFAULT nextval('public.brand_feature_id_seq'::regclass);


--
-- Name: brand_image id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_image ALTER COLUMN id SET DEFAULT nextval('public.brand_image_id_seq'::regclass);


--
-- Name: category_brand id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_brand ALTER COLUMN id SET DEFAULT nextval('public.category_brand_id_seq'::regclass);


--
-- Name: category_brand_price id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_brand_price ALTER COLUMN id SET DEFAULT nextval('public.category_brand_price_id_seq'::regclass);


--
-- Name: category_feature id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_feature ALTER COLUMN id SET DEFAULT nextval('public.category_feature_id_seq'::regclass);


--
-- Name: category_list id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_list ALTER COLUMN id SET DEFAULT nextval('public.category_list_id_seq'::regclass);


--
-- Name: category_rate id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_rate ALTER COLUMN id SET DEFAULT nextval('public.category_rate_id_seq'::regclass);


--
-- Name: cheque id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque ALTER COLUMN id SET DEFAULT nextval('public.cheque_id_seq'::regclass);


--
-- Name: cheque_transfer_product id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product ALTER COLUMN id SET DEFAULT nextval('public.cheque_transfer_product_id_seq'::regclass);


--
-- Name: credit id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.credit ALTER COLUMN id SET DEFAULT nextval('public.credit_id_seq'::regclass);


--
-- Name: database_log id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.database_log ALTER COLUMN id SET DEFAULT nextval('public.database_log_id_seq'::regclass);


--
-- Name: discount_calander id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander ALTER COLUMN id SET DEFAULT nextval('public.discount_calander_id_seq'::regclass);


--
-- Name: discount_calander_banner id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_banner ALTER COLUMN id SET DEFAULT nextval('public.discount_calander_banner_id_seq'::regclass);


--
-- Name: discount_calander_list id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list ALTER COLUMN id SET DEFAULT nextval('public.discount_calander_list_id_seq'::regclass);


--
-- Name: discount_calander_list_banner_category id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list_banner_category ALTER COLUMN id SET DEFAULT nextval('public.discount_calander_list_banner_category_id_seq'::regclass);


--
-- Name: discount_calander_list_codes id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list_codes ALTER COLUMN id SET DEFAULT nextval('public.discount_calander_list_codes_id_seq'::regclass);


--
-- Name: discount_calander_msg id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_msg ALTER COLUMN id SET DEFAULT nextval('public.discount_calander_msg_id_seq'::regclass);


--
-- Name: discount_calander_msg_media id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_msg_media ALTER COLUMN id SET DEFAULT nextval('public.discount_calander_msg_media_id_seq'::regclass);


--
-- Name: discount_calander_msg_reciever id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_msg_reciever ALTER COLUMN id SET DEFAULT nextval('public.discount_calander_msg_reciever_id_seq'::regclass);


--
-- Name: error_log id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.error_log ALTER COLUMN id SET DEFAULT nextval('public.error_log_id_seq'::regclass);


--
-- Name: facktor_info id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.facktor_info ALTER COLUMN id SET DEFAULT nextval('public.facktor_info_id_seq'::regclass);


--
-- Name: feature id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.feature ALTER COLUMN id SET DEFAULT nextval('public.feature_id_seq'::regclass);


--
-- Name: feature_value id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.feature_value ALTER COLUMN id SET DEFAULT nextval('public.feature_value_id_seq'::regclass);


--
-- Name: feature_values_category id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.feature_values_category ALTER COLUMN id SET DEFAULT nextval('public.feature_values_category_id_seq'::regclass);


--
-- Name: financial_document id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.financial_document ALTER COLUMN id SET DEFAULT nextval('public.financial_document_id_seq'::regclass);


--
-- Name: giftcard id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.giftcard ALTER COLUMN id SET DEFAULT nextval('public.giftcard_id_seq'::regclass);


--
-- Name: holding_hands id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.holding_hands ALTER COLUMN id SET DEFAULT nextval('public.holding_hands_id_seq'::regclass);


--
-- Name: my_order id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.my_order ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: order_products id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.order_products ALTER COLUMN id SET DEFAULT nextval('public.order_products_id_seq'::regclass);


--
-- Name: order_send id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.order_send ALTER COLUMN id SET DEFAULT nextval('public.order_send_id_seq'::regclass);


--
-- Name: order_type id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.order_type ALTER COLUMN id SET DEFAULT nextval('public.order_type_id_seq'::regclass);


--
-- Name: pos id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.pos ALTER COLUMN id SET DEFAULT nextval('public.pos_id_seq'::regclass);


--
-- Name: pos_transactions id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.pos_transactions ALTER COLUMN id SET DEFAULT nextval('public.pos_transactions_id_seq'::regclass);


--
-- Name: poz_transactions id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.poz_transactions ALTER COLUMN id SET DEFAULT nextval('public.poz_transactions_id_seq'::regclass);


--
-- Name: price_config_term id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.price_config_term ALTER COLUMN id SET DEFAULT nextval('public.price_config_term_id_seq'::regclass);


--
-- Name: price_feature_values id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.price_feature_values ALTER COLUMN id SET DEFAULT nextval('public.price_feature_values_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: product_barcode id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_barcode ALTER COLUMN id SET DEFAULT nextval('public.product_barcode_id_seq'::regclass);


--
-- Name: product_feature_values id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_feature_values ALTER COLUMN id SET DEFAULT nextval('public.product_feature_values_id_seq'::regclass);


--
-- Name: product_images id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);


--
-- Name: product_price id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_price ALTER COLUMN id SET DEFAULT nextval('public.product_price_id_seq'::regclass);


--
-- Name: product_rate id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_rate ALTER COLUMN id SET DEFAULT nextval('public.product_rate_id_seq'::regclass);


--
-- Name: rate id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.rate ALTER COLUMN id SET DEFAULT nextval('public.rate_id_seq'::regclass);


--
-- Name: review id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.review ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);


--
-- Name: stock_taking id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.stock_taking ALTER COLUMN id SET DEFAULT nextval('public.stock_taking_id_seq'::regclass);


--
-- Name: stock_taking_product id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.stock_taking_product ALTER COLUMN id SET DEFAULT nextval('public.stock_taking_product_id_seq'::regclass);


--
-- Name: task_queue id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.task_queue ALTER COLUMN id SET DEFAULT nextval('public.task_queue_id_seq'::regclass);


--
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- Name: transfer id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.transfer ALTER COLUMN id SET DEFAULT nextval('public.transfer_id_seq'::regclass);


--
-- Name: unit id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.unit ALTER COLUMN id SET DEFAULT nextval('public.unit_id_seq'::regclass);


--
-- Name: wallet id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.wallet ALTER COLUMN id SET DEFAULT nextval('public.wallet_id_seq'::regclass);


--
-- Name: warehouse id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.warehouse ALTER COLUMN id SET DEFAULT nextval('public.warehouse_id_seq'::regclass);


--
-- Name: warehouse_managers id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.warehouse_managers ALTER COLUMN id SET DEFAULT nextval('public.warehouse_managers_id_seq'::regclass);


--
-- Name: warehouse_phones id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.warehouse_phones ALTER COLUMN id SET DEFAULT nextval('public.warehouse_phones_id_seq'::regclass);


--
-- Name: wastage id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.wastage ALTER COLUMN id SET DEFAULT nextval('public.wastage_id_seq'::regclass);


--
-- Name: withdraw_wallet id; Type: DEFAULT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.withdraw_wallet ALTER COLUMN id SET DEFAULT nextval('public.withdraw_wallet_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.account (id, account_number, card_number, shaba_number, bank, type, title, is_actvie, created_at, deleted_at) FROM stdin;
3	101001	5892101334748551	IR330150000003130018911724	سپه	1	بانک سپه	t	2023-09-03 17:32:52.205377	\N
4	null-record	null-record	null-record	null-record	null-record	null-record	f	2023-09-28 18:19:33.382836	\N
\.


--
-- Data for Name: bank_check; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.bank_check (id, order_id, account_id, amount, number, account_number, due_date, bank, owner, status, image, created_at, deleted_at, user_id, manager_id, is_accept, type_id, is_add_transaction, status_id, is_add_wallet) FROM stdin;
\.


--
-- Data for Name: bank_receipt; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.bank_receipt (id, order_id, account_id, amount, number, due_date, account_number, image, created_at, deleted_at, user_id, manager_id, is_accept, type_id, is_add_transaction, is_add_wallet) FROM stdin;
\.


--
-- Data for Name: basket; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.basket (id, product_id, product_price_id, warehouse_id, user_id, type_user_id, inserted_at, finished_at, number, per_price, send_by, next_buy, order_status) FROM stdin;
2	1	2	2	string	string	2023-10-02 13:14:46.401077	\N	2	1000	string	f	paying
\.


--
-- Data for Name: brand; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.brand (id, title, title_en, logo, alt_logo, description, video, url, deleted_at, inserted_at, percentage_floor, percentage_ceiling, publishdate, isdraft, language, viewmode, seo, refrence_id, is_seo_url_ok, seo_url_last_response, seo_id) FROM stdin;
14	string	string	string	string	string	string	string	\N	2023-07-24 14:54:33.417525	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	29665	\N	\N	\N
16	string	string	string	string	string	string	string	\N	2023-07-24 14:56:38.648394	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	54716	\N	\N	\N
17	string	string	string	string	string	string	string	\N	2023-07-24 15:02:30.140279	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	85129	\N	\N	\N
18	string	string	string	string	string	string	string	\N	2023-07-24 15:02:46.973222	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	41373	\N	\N	\N
19	string	string	string	string	string	string	string	\N	2023-07-24 15:04:27.781974	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	58171	\N	\N	\N
1	نایک	nike	alt	string	string	string	string	\N	2023-07-20 08:38:50.666549	0	0	2023-07-20 08:37:37	string	string	string	string	123	\N	\N	\N
2	string	string	string	string	string	string	string	\N	2023-07-20 15:45:33.753763	0	0	2023-07-20 08:37:37	string	string	string	string	85322	\N	\N	\N
4	string	string	string	string	string	string	string	\N	2023-07-24 14:28:02.071089	0	0	2023-07-20 15:46:04.120269	false	string	string	string	49729	\N	\N	\N
5	string	string	string	string	string	string	string	\N	2023-07-24 14:28:48.839428	0	0	2023-07-20 15:46:04.120269	false	string	string	string	19838	\N	\N	\N
6	string	string	string	string	string	string	string	\N	2023-07-24 14:35:37.829593	0	0	2023-07-20 15:46:04.120269	false	string	string	string	89917	\N	\N	\N
7	string	string	string	string	string	string	string	\N	2023-07-24 14:46:15.097158	0	0	2023-07-20 15:46:04.120269	true	string	string	string	80780	\N	\N	\N
8	string	string	string	string	string	string	string	\N	2023-07-24 14:47:20.512975	0	0	2023-07-20 15:46:04.120269	true	string	string	url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]	12155	\N	\N	\N
9	string	string	string	string	string	string	string	\N	2023-07-24 14:47:36.425073	0	0	2023-07-20 15:46:04.120269	true	string	string	url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]	22317	\N	\N	\N
10	string	string	string	string	string	string	string	\N	2023-07-24 14:47:57.129056	0	0	2023-07-20 15:46:04.120269	false	string	string	url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]	27813	\N	\N	\N
11	string	string	string	string	string	string	string	\N	2023-07-24 14:48:22.871169	0	0	2023-07-20 15:46:04.120269	false	string	string	{url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	47462	\N	\N	\N
12	string	string	string	string	string	string	string	\N	2023-07-24 14:53:29.516398	0	0	2023-07-20 15:46:04.120269	false	string	string	{url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	99265	\N	\N	\N
13	string	string	string	string	string	string	string	\N	2023-07-24 14:53:51.179302	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	46252	\N	\N	\N
20	string	string	string	string	string	string	string	\N	2023-07-24 15:05:18.593989	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	19618	\N	\N	\N
15	شششش	sssss	string	string	string	string	string	\N	2023-07-24 14:55:08.668891	0	0	2023-07-20 15:46:04.120269	true	string	string	string	string	\N	\N	\N
35	string	string	string	string	string	string	\N	\N	2023-09-21 16:20:23.762635	0	0	2023-09-21 16:20:23.762635	true	string	string	string	string	\N	\N	\N
21	string	string	string	string	string	string	string	\N	2023-07-24 15:07:06.591502	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	84209	\N	\N	\N
22	string	string	string	string	string	string	string	\N	2023-07-24 15:11:52.363817	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	76336	\N	\N	\N
23	string	string	string	string	string	string	string	\N	2023-07-24 15:15:17.035294	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	98367	\N	\N	\N
24	string	string	string	string	string	string	string	\N	2023-07-24 15:18:43.461325	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	39159	\N	\N	\N
25	string	string	string	string	string	string	string	\N	2023-07-24 15:22:26.916409	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	64637	\N	\N	\N
26	string	string	string	string	string	string	string	\N	2023-07-24 15:23:38.328207	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	46584	\N	\N	\N
27	string	string	string	string	string	string	string	\N	2023-07-24 15:24:24.772369	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	12664	\N	\N	\N
28	string	string	string	string	string	string	string	\N	2023-07-24 15:24:56.875134	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p2', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	32340	\N	\N	\N
29	string	string	string	string	string	string	string	\N	2023-07-24 15:25:12.89258	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	15353	\N	\N	\N
30	string	string	string	string	string	string	string	\N	2023-07-24 15:25:19.801546	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'p2', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	66360	\N	\N	\N
31	string	string	string	string	string	string	string	\N	2023-07-24 15:25:50.730973	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'hassan', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	67127	\N	\N	\N
32	string	string	string	string	string	string	string	\N	2023-07-24 15:25:59.785173	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'amir', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	31874	\N	\N	\N
3	string	string	string	string	string	string	string	\N	2023-07-20 15:46:04.120269	0	0	2023-07-20 08:37:37	true	string	string	string	string	\N	\N	\N
33	string	string	string	string	string	string	string	\N	2023-07-24 15:29:05.640664	0	0	2023-07-20 15:46:04.120269	false	string	string	{'url': 'amir', 'mainKeyWord': 'strisng2', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}	61486	\N	\N	\N
34	تست آپدیت	string	string	string	string	string	\N	2023-08-31 11:32:41.351798	2023-08-31 11:07:38.525582	0	0	2023-07-24 15:29:05.640664	true	string	string	string	string	\N	\N	\N
\.


--
-- Data for Name: brand_category; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.brand_category (id, brand_id, category, inserted_at) FROM stdin;
\.


--
-- Data for Name: brand_feature; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.brand_feature (id, brand_id, feature_id, feature_value_id, sort_id_feature, sort_id_feature_value) FROM stdin;
1	1	1	1	1	1
2	1	1	5	1	1
3	1	1	1	1	1
\.


--
-- Data for Name: brand_image; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.brand_image (id, brand_id, url, alt, deleted_at, inserted_at) FROM stdin;
2	1	testutl	string	\N	2023-07-22 10:31:49.568158
5	1	https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.facebook.com%2F1926341300773088%2Fposts%2F2451501754923704%2F%3Flocale%3Dar_AR&psig=AOvVaw26J7zOHAjonn-YkoiO2l0R&ust=1709469867598000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJD08tPN1YQDFQAAAAAdAAAAABAE	الوچه	\N	2024-03-02 16:14:57.559593
3	34	link	my alt	2024-03-02 16:34:47.566602	2023-08-31 11:32:41.370229
1	1	url	alt	2024-03-02 16:38:23.045827	2023-07-22 10:30:41.086505
\.


--
-- Data for Name: category_brand; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.category_brand (id, brand_id, category_id, sort_id) FROM stdin;
\.


--
-- Data for Name: category_brand_price; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.category_brand_price (id, brand_id, category, prcentage_floor, prcentage_ceiling) FROM stdin;
1	35	1	1	5
\.


--
-- Data for Name: category_brand_price_action; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.category_brand_price_action (id, category_id, is_increase, percentage, brand_id, created_at, self_id) FROM stdin;
12	موبایل	t	10	35	2023-09-28 16:03:29.866059	0
13	موبایل	t	10	35	2023-09-28 16:03:45.198516	7
14	موبایل	t	10	35	2023-09-28 16:03:45.277841	7
15	موبایل	t	10	35	2023-09-28 16:05:08.382104	12
16	موبایل	t	20	35	2023-09-28 16:06:17.574545	0
17	موبایل	t	20	35	2023-09-28 16:06:36.908983	16
18	موبایل	t	20	12	2023-09-28 16:22:02.572298	0
19	موبایل	t	20	12	2023-09-28 16:23:37.874081	0
20	موبایل	t	20	1	2023-09-28 16:23:51.101498	0
21	موبایل	t	20	1	2023-09-28 16:24:03.938499	0
\.


--
-- Data for Name: category_feature; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.category_feature (id, feature_id, category_id, sort_id) FROM stdin;
\.


--
-- Data for Name: category_list; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.category_list (id, product_id, category_id, order_num) FROM stdin;
1	1	موبایل	1
2	1	1	3
3	1	tv	3
\.


--
-- Data for Name: category_rate; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.category_rate (id, rate_id, category_id, order_num) FROM stdin;
\.


--
-- Data for Name: cheque; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.cheque (id, order_id, warehouse_id, warehouse_manager_id, title, code, receive_at, created_at, description, deleted_at, type, type_id) FROM stdin;
26	10	2	string	string	ziVeMdLKuU	2023-09-19 13:27:06.166633	2023-09-19 13:27:06.166633	string	\N	خرید	1
27	10	2	string	string	KQV2W5lsAD	2023-09-19 13:27:24.632044	2023-09-19 13:27:24.632044	string	\N	خرید	1
28	10	2	string	string	bVcHNHKSZO	2023-09-19 13:29:44.254073	2023-09-19 13:29:44.254073	string	\N	خرید	1
29	10	2	string	string	lKWOGHxszE	2023-09-19 13:34:27.936713	2023-09-19 13:34:27.936713	string	\N	خرید	1
30	10	2	string	string	rjP6hT9BBf	2023-09-19 13:35:01.761594	2023-09-19 13:35:01.761594	string	\N	خرید	1
31	10	2	string	string	vxe8cnccZI	2023-09-19 13:36:24.951013	2023-09-19 13:36:24.951013	string	\N	خرید	1
32	10	2	string	string	sPf7IswHlY	2023-09-19 13:49:41.40101	2023-09-19 13:49:41.40101	string	\N	خرید	1
33	10	2	string	string	7PdachT5M3	2023-09-19 13:51:59.091174	2023-09-19 13:51:59.091174	string	\N	خرید	1
34	10	2	string	string	a8p8iDCdIy	2023-09-19 13:52:47.290233	2023-09-19 13:52:47.290233	string	\N	خرید	1
35	10	2		null-record	5oi1K54SDb	2023-09-28 18:09:51.562276	2023-09-28 18:09:51.562276	null-record	\N	null-record	0
36	10	2		null-record	brz17dp9Pz	2023-09-28 18:10:24.058615	2023-09-28 18:10:24.058615	null-record	\N	null-record	0
37	10	2		null-record	0V1gWnZoBL	2023-09-28 18:10:54.76182	2023-09-28 18:10:54.76182	null-record	\N	null-record	0
38	10	2		null-record	GJJRAT3nfe	2023-09-28 18:14:30.382046	2023-09-28 18:14:30.382046	null-record	\N	null-record	0
39	10	2		null-record	AvwMpXqZv9	2023-09-28 18:15:00.128694	2023-09-28 18:15:00.128694	null-record	\N	null-record	0
40	10	2		null-record	CZFB6CXj6k	2023-09-28 18:15:29.499027	2023-09-28 18:15:29.499027	null-record	\N	null-record	0
41	10	2		null-record	JKvcahdxt5	2023-09-28 18:16:09.465295	2023-09-28 18:16:09.465295	null-record	\N	null-record	0
42	10	2		null-record	vuGAr5hxbU	2023-09-28 18:17:09.393994	2023-09-28 18:17:09.393994	null-record	\N	null-record	0
43	10	2		null-record	HKHhTEc71o	2023-09-28 18:18:02.191564	2023-09-28 18:18:02.191564	null-record	\N	null-record	0
44	10	2		null-record	Oc3vldeER4	2023-09-28 18:18:41.49038	2023-09-28 18:18:41.49038	null-record	\N	null-record	0
45	10	2		null-record	LJjoptZK2N	2023-09-28 18:19:07.006779	2023-09-28 18:19:07.006779	null-record	\N	null-record	0
46	10	2		null-record	gNaAuWut1Y	2023-09-28 18:19:33.020884	2023-09-28 18:19:33.020884	null-record	\N	null-record	0
47	11	2		null-record	GJJ18AM1GA	2023-09-28 18:20:13.381249	2023-09-28 18:20:13.381249	null-record	\N	null-record	0
48	11	2		null-record	2LynE7YSds	2023-09-28 18:20:52.598304	2023-09-28 18:20:52.598304	null-record	\N	null-record	0
49	11	2		null-record	xJ1bBV9Tos	2023-09-28 18:21:15.95054	2023-09-28 18:21:15.95054	null-record	\N	null-record	0
50	11	2		null-record	3QbwrtdAWq	2023-09-30 14:17:44.80556	2023-09-30 14:17:44.80556	null-record	\N	null-record	0
51	11	2		null-record	pWTSEWNjGZ	2023-09-30 14:19:00.794392	2023-09-30 14:19:00.794392	null-record	\N	null-record	0
52	11	2		null-record	uyZrJGOrUo	2023-09-30 14:20:31.202564	2023-09-30 14:20:31.202564	null-record	\N	null-record	0
53	11	3		null-record	VR9RoF1IaI	2023-09-30 14:20:31.251475	2023-09-30 14:20:31.251475	null-record	\N	null-record	0
54	11	3		null-record	tFT1ciUfhR	2023-09-30 15:13:48.424018	2023-09-30 15:13:48.424018	null-record	\N	null-record	0
55	11	3		null-record	iLY9usTGFg	2023-09-30 15:14:56.040756	2023-09-30 15:14:56.040756	null-record	\N	null-record	0
56	11	2		null-record	n33UC5zcdG	2023-09-30 15:16:01.339478	2023-09-30 15:16:01.339478	null-record	\N	null-record	0
57	11	2		null-record	GCZknTCwFb	2023-09-30 15:20:22.246836	2023-09-30 15:20:22.246836	null-record	\N	null-record	0
58	11	2		null-record	gB80JKolUF	2023-10-01 15:35:17.290126	2023-10-01 15:35:17.290126	null-record	\N	null-record	0
59	11	2		null-record	hxmqGb7vtt	2023-10-01 15:35:54.498063	2023-10-01 15:35:54.498063	null-record	\N	null-record	0
60	11	2		null-record	LCJIbCpuy4	2023-10-01 15:36:08.570436	2023-10-01 15:36:08.570436	null-record	\N	null-record	0
61	11	2		null-record	yVfcN8cWLo	2023-10-01 15:36:13.92552	2023-10-01 15:36:13.92552	null-record	\N	null-record	0
62	11	2		null-record	7NznP95TaE	2023-10-01 15:41:39.792855	2023-10-01 15:41:39.792855	null-record	\N	null-record	0
63	11	2		null-record	fnOpDJLeaS	2023-10-01 15:48:40.890613	2023-10-01 15:48:40.890613	null-record	\N	null-record	0
64	11	2		null-record	uTCEW35TpN	2023-10-01 15:49:38.875587	2023-10-01 15:49:38.875587	null-record	\N	null-record	0
\.


--
-- Data for Name: cheque_transfer_product; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.cheque_transfer_product (id, product_id, order_id, unit_id, warehouse_id, wastage_id, cheque_id, transfer_id, stock_taking_product_id, number, description, created_at, deleted_at, is_increase, type, refrence_id) FROM stdin;
15	1	10	1	2	2	30	1	1	1	string	2023-09-19 13:35:02.21723	\N	t	cheque	string
16	1	10	1	2	2	31	1	1	1	string	2023-09-19 13:36:25.452715	\N	t	cheque	string
17	1	10	1	2	2	32	1	1	1	string	2023-09-19 13:49:41.977177	\N	t	cheque	string
18	1	10	1	2	2	33	1	1	1	string	2023-09-19 13:51:59.570241	\N	t	cheque	string
13	1	10	1	2	2	28	1	1	4	string	2023-09-19 13:29:44.858996	\N	t	cheque	string
19	1	10	1	2	2	34	1	1	1	string	2023-09-19 13:52:47.77102	\N	t	cheque	string
20	1	11	1	2	19	49	1	1	1		2023-09-28 18:21:16.117398	\N	f	wastage	string
21	1	11	1	2	2	52	7	1	5	string	2023-09-30 14:20:31.22127	\N	f	transfer	string
22	1	11	1	3	2	53	7	1	5	string	2023-09-30 14:20:31.281611	\N	t	transfer	string
23	1	11	1	3	2	54	8	1	1	string	2023-09-30 15:13:48.442942	\N	f	transfer	string
24	1	11	1	3	2	54	8	1	1	string	2023-09-30 15:19:32.947783	\N	t	transfer	string
25	1	11	1	2	2	57	9	1	2	string	2023-09-30 15:20:22.264739	\N	f	transfer	string
26	1	11	1	2	2	57	9	1	2	string	2023-09-30 15:21:01.487559	\N	t	transfer	string
31	1	11	1	2	2	63	1	9	7	انبار گردانی	2023-10-01 15:48:40.926195	\N	t	stock_talking_product	
32	1	11	1	2	2	64	1	10	1	انبار گردانی	2023-10-01 15:49:38.908454	\N	f	stock_talking_product	
\.


--
-- Data for Name: credit; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.credit (id, amount, due_date, user_id, manager_id, created_at, deleted_at, left_over) FROM stdin;
\.


--
-- Data for Name: database_log; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.database_log (id, created_at, class_name, func_name, error, arg, kwargs, befor_data, after_data, type_query, username, result, code) FROM stdin;
1	2023-07-20 08:38:50.678264	repository.brand.brand	add	\N	({'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishdate': '2023-07-20 08:37:37', 'isdraft': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'})	add
2	2023-07-20 10:10:44.90849	repository.brand.brand	soft_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': '2023-07-20 10:10:44.891817', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	soft	my-key	(True, '')	main
3	2023-07-20 10:11:11.294542	repository.brand.brand	soft_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': '2023-07-20 10:10:44.891817', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': '2023-07-20 10:11:11.285991', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	soft	my-key	(True, '')	main
4	2023-07-20 10:11:11.942461	repository.brand.brand	soft_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': '2023-07-20 10:11:11.285991', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': '2023-07-20 10:11:11.936458', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	soft	my-key	(True, '')	main
5	2023-07-20 10:11:12.46857	repository.brand.brand	soft_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': '2023-07-20 10:11:11.936458', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': '2023-07-20 10:11:12.462266', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	soft	my-key	(True, '')	main
6	2023-07-20 10:11:20.667693	repository.brand.brand	recovery	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': '2023-07-20 10:11:12.462266', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	recovery	my-key	True	main
7	2023-07-20 10:11:26.599969	repository.brand.brand	soft_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': '2023-07-20 10:11:26.593510', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	soft	my-key	(True, '')	main
8	2023-07-20 10:32:13.411862	repository.brand.brand	recovery	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'}	recovery	my-key	True	main
9	2023-07-20 15:45:35.175772	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishdate': '2023-07-20 08:37:37', 'isdraft': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 15:45:33.753763', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': '85322'})	add
10	2023-07-20 15:46:04.122863	repository.brand.brand	add	\N	({'title': 'تست رفرنس آیدی', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishdate': '2023-07-20 08:37:37', 'isdraft': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': '85322'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'title': 'تست رفرنس آیدی', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 15:46:04.120269', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishdate': '2023-07-20 08:37:37', 'isdraft ': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': '85322'})	add
11	2023-07-22 10:30:41.098653	repository.brand.brand_image	add	\N	({'brand_id': 1, 'url': 'url', 'alt': 'alt'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:30:41.086505'})	add
12	2023-07-22 10:31:49.576194	repository.brand.brand_image	add	\N	({'brand_id': 1, 'url': 'testutl', 'alt': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'})	add
13	2023-07-22 10:37:32.817395	repository.brand.brand_image	soft_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:30:41.086505'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}	soft	my-key	(True, '')	main
14	2023-07-22 10:37:50.088196	repository.brand.brand_image	hard_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}	delete	my-key	(True, '')	main
15	2023-07-22 10:39:03.094244	repository.brand.brand_image	hard_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}	delete	my-key	(False, 'بعد از گذشت چند روز می توانید دیتا را پاک کنید')	main
16	2023-07-22 11:27:27.176228	repository.feature.feature	add	\N	({'title': 'سایز', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'})	add
17	2023-07-22 11:28:06.869477	repository.feature.feature	add	\N	({'title': 'سری پردازنده', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'})	add
18	2023-07-22 11:28:13.205533	repository.feature.feature	add	\N	({'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'})	add
19	2023-07-22 11:32:05.319132	repository.feature.feature	add	\N	({'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
20	2023-07-22 11:32:26.238607	repository.feature.feature	add	\N	({'title': 'دقت صفحه نمایش', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 4, 'title': 'دقت صفحه نمایش', 'show_up': True, 'inserted_at': '2023-07-22 11:32:26.232008', 'deleted_at': 'None', 'language': 'string'})	add
21	2023-07-22 11:58:10.260256	repository.feature.feature_value	add	\N	({'value': 'یک ترابایت'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'value': 'یک ترابایت'})	add
22	2023-07-22 11:58:12.898014	repository.feature.feature_value	add	\N	({'value': 'یک ترابایت'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
23	2023-07-22 11:58:20.321652	repository.feature.feature_value	add	\N	({'value': 'Intel'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'value': 'Intel'})	add
24	2023-07-22 11:58:29.131094	repository.feature.feature_value	add	\N	({'value': 'چهار گیگابایت'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'value': 'چهار گیگابایت'})	add
25	2023-07-22 11:58:33.8549	repository.feature.feature_value	add	\N	({'value': 'Core i3'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 4, 'value': 'Core i3'})	add
26	2023-07-22 13:15:19.403998	repository.brand.brand_feature	add	\N	({'brand_id': 1, 'feature_id': 1, 'sort_id_feature': 1, 'feature_value_id': 1, 'sort_id_feature_value': 1},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1'})	add
27	2023-07-22 13:15:45.552917	repository.feature.feature_value	add	\N	({'value': '2 ترابایت'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 5, 'value': '2 ترابایت'})	add
28	2023-07-22 13:16:00.555227	repository.brand.brand_feature	add	\N	({'brand_id': 1, 'feature_id': 1, 'sort_id_feature': 1, 'feature_value_id': 5, 'sort_id_feature_value': 1},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1'})	add
67	2023-08-14 14:07:41.232576	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': '330150000003130018911724', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره شبا قبلا ثبت شده است.')	add
29	2023-07-24 14:46:15.112439	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 7, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 14:46:15.097158', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'true', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '80780', 'images': [], 'features': [], 'fileUses': ['string']})	add
30	2023-07-24 14:47:20.518436	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': "url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 8, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 14:47:20.512975', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'true', 'language': 'string', 'viewMode': 'string', 'seo': "url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]", 'refrence_id': '12155', 'images': [], 'features': [], 'fileUses': ['string']})	add
31	2023-07-24 14:47:36.438652	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': "url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 9, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 14:47:36.425073', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'true', 'language': 'string', 'viewMode': 'string', 'seo': "url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]", 'refrence_id': '22317', 'images': [], 'features': [], 'fileUses': ['string']})	add
32	2023-07-24 14:55:08.748443	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 15, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 14:55:08.668891', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '10036', 'images': [], 'features': [], 'fileUses': ['string']})	add
33	2023-07-24 14:56:38.696675	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 16, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 14:56:38.648394', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '54716', 'images': [], 'features': [], 'fileUses': ['string']})	add
34	2023-07-24 15:02:30.195665	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 17, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:02:30.140279', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '85129', 'images': [], 'features': [], 'fileUses': ['string']})	add
35	2023-07-24 15:02:47.448979	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 18, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:02:46.973222', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '41373', 'images': [], 'features': [], 'fileUses': ['string']})	add
36	2023-07-24 15:04:27.831675	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 19, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:04:27.781974', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '58171', 'images': [], 'features': [], 'fileUses': ['string']})	add
37	2023-07-24 15:05:18.650443	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 20, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:05:18.593989', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '19618', 'images': [], 'features': [], 'fileUses': ['string']})	add
68	2023-08-14 14:07:51.334819	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': '330150000003130018911724', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره شبا قبلا ثبت شده است.')	add
74	2023-08-14 14:43:09.731692	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': 'ir3301500000031300189117124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
541	2024-02-27 15:09:54.96133	repository.category.category_list	add	\N	({'product_id': 1, 'category_id': '1', 'order_num': 3},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'product_id': 1, 'category_id': '1', 'order_num': 3})	add
38	2023-07-24 15:07:06.634059	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 21, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:07:06.591502', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '84209', 'images': [], 'features': [], 'fileUses': ['string']})	add
39	2023-07-24 15:11:52.422276	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 22, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:11:52.363817', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '76336', 'images': [], 'features': [], 'fileUses': ['string']})	add
40	2023-07-24 15:15:17.092534	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 23, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:15:17.035294', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '98367', 'images': [], 'features': [], 'fileUses': ['string']})	add
41	2023-07-24 15:18:43.557406	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 24, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:18:43.461325', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content', 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '39159', 'images': [], 'features': [], 'fileUses': ['string']})	add
69	2023-08-14 14:38:23.16998	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': '330150000003130018911724', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره شبا قبلا ثبت شده است.')	add
75	2023-08-14 14:43:32.558009	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': 'ir3301500000031300189117124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
542	2024-02-27 15:30:06.637606	repository.category.category_list	add	\N	({'product_id': 1, 'category_id': 'tv', 'order_num': 3},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'product_id': 1, 'category_id': 'tv', 'order_num': 3})	add
42	2023-07-24 15:22:26.969752	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 25, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:22:26.916409', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '64637', 'images': [], 'features': [], 'fileUses': ['string']})	add
43	2023-07-24 15:23:38.388879	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 26, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:23:38.328207', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '46584', 'images': [], 'features': [], 'fileUses': ['string']})	add
44	2023-07-24 15:24:24.877327	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 27, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:24:24.772369', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '12664', 'images': [], 'features': [], 'fileUses': ['string']})	add
45	2023-07-24 15:24:56.927339	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p2', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 28, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:24:56.875134', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p2', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '32340', 'images': [], 'features': [], 'fileUses': ['string']})	add
70	2023-08-14 14:42:15.425795	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': '330150000003130018911724', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'not IR in value')	add
71	2023-08-14 14:42:25.35447	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': 'ir330150000003130018911724', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
46	2023-07-24 15:25:12.935185	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 29, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:25:12.892580', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p1', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '15353', 'images': [], 'features': [], 'fileUses': ['string']})	add
47	2023-07-24 15:25:19.858538	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p2', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 30, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:25:19.801546', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'p2', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '66360', 'images': [], 'features': [], 'fileUses': ['string']})	add
48	2023-07-24 15:25:50.784096	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'hassan', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 31, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:25:50.730973', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'hassan', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '67127', 'images': [], 'features': [], 'fileUses': ['string']})	add
49	2023-07-24 15:25:59.832273	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'amir', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 32, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:25:59.785173', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'amir', 'mainKeyWord': 'strisng', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '31874', 'images': [], 'features': [], 'fileUses': ['string']})	add
72	2023-08-14 14:42:56.959568	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': 'ir330150000003130018911724', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
73	2023-08-14 14:43:05.109678	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': 'ir3301500000031300189117124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
50	2023-07-24 15:29:05.71635	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft': False, 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'amir', 'mainKeyWord': 'strisng2', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 33, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-24 15:29:05.640664', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 15:46:04.120269', 'isDraft ': 'false', 'language': 'string', 'viewMode': 'string', 'seo': "{'url': 'amir', 'mainKeyWord': 'strisng2', 'keyWords': [], 'seoAnkertexts': ['string'], 'canoncialAddress': 'string','oldAddress': 'string','isStatic': false,'seoTitle': 'string','metaDescription': 'string', 'redirectList': [ { 'target': 'string', 'type': '301' } ], 'schemaType': 'article', 'articleType': 'content',   'questionOppened' : 'yes' , 'social': [{'socialName': 'twitter','title': 'string','description': 'string','image': 'string' }]}", 'refrence_id': '61486', 'images': [], 'features': [], 'fileUses': ['string']})	add
51	2023-07-25 17:04:03.40608	repository.feature.feature_values_category	add	\N	({'feature_value_id': 1, 'feature_id': 1, 'category_id': 'string', 'is_filter': True, 'feature_sort_id': 1, 'language': 'string', 'feature_value_sort_id': 1},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'feature_value_id': 1, 'feature_id': 1, 'category_id': 'string', 'is_filter': True, 'inserted_at': '2023-07-25 17:04:03.391286', 'deleted_at': 'None', 'feature_sort_id': 1, 'language': 'string', 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت'}, 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}})	add
52	2023-07-25 17:11:25.791978	repository.product.unit	add	\N	({'title': 'کیلوگرم'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'title': 1})	add
53	2023-07-25 17:13:26.610054	repository.product.unit	add	\N	({'title': 'سانتی متر'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'title': 1})	add
54	2023-07-25 17:13:43.984102	repository.product.unit	add	\N	({'title': 'سانتی متر'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این عنوان قبلا اضافه شده است.')	add
55	2023-07-25 17:13:49.724422	repository.product.unit	add	\N	({'title': 'متر'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'title': 1})	add
56	2023-07-26 13:40:57.398916	repository.product.rate	add	\N	({'title': 'کیفیت و کارایی'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'title': 1})	add
57	2023-07-26 13:41:22.930835	repository.product.rate	add	\N	({'title': 'قیمت و ارزش خرید'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'title': 1})	add
58	2023-07-26 13:42:04.067173	repository.product.rate	add	\N	({'title': 'ابعاد یا سایز'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'title': 1})	add
59	2023-07-26 13:42:10.8951	repository.product.rate	add	\N	({'title': 'شباهت یا مغایرت'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 4, 'title': 1})	add
60	2023-07-26 14:53:24.632182	repository.product.product_rate	add	\N	({'product_id': 1, 'rate_id': 1, 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'product_id': 1, 'rate_id': 1, 'rate_obj': {'id': 1, 'title': 1}})	add
61	2023-07-26 14:53:34.509347	repository.product.product_rate	add	\N	({'product_id': 1, 'rate_id': 2, 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'product_id': 1, 'rate_id': 2, 'rate_obj': {'id': 2, 'title': 1}})	add
62	2023-07-26 14:53:39.388965	repository.product.product_rate	add	\N	({'product_id': 1, 'rate_id': 3, 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'product_id': 1, 'rate_id': 3, 'rate_obj': {'id': 3, 'title': 1}})	add
63	2023-08-08 14:24:41.55829	repository.schedule.task_queue	add	\N	({'date': '2023-08-08 13:36:39', 'hour': 10, 'miunte': 30, 'args': "('my args ', 'my id')", 'kwargs': "{'OPERATOR' : 'hassan'}", 'class_name': 'string', 'function_name': 'Brand', 'response_error': 'publish'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'date': '2023-08-08 13:36:39', 'hour': 10, 'miunte': 30, 'args': "('my args ', 'my id')", 'kwargs': "{'OPERATOR' : 'hassan'}", 'status': 'none', 'created_at': '2023-08-08 14:24:41.543405', 'updated_at': None, 'class_name': 'string', 'function_name': 'Brand', 'response_error': 'publish'})	add
64	2023-08-08 14:25:24.848485	repository.schedule.task_queue	add	\N	({'date': '2023-08-08 13:36:39', 'hour': 10, 'miunte': 30, 'args': "('my args ', 'my id')", 'kwargs': "{'OPERATOR' : 'hassan'}", 'class_name': 'string', 'function_name': 'Brand', 'response_error': 'publish'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'date': '2023-08-08 13:36:39', 'hour': 10, 'miunte': 30, 'args': "('my args ', 'my id')", 'kwargs': "{'OPERATOR' : 'hassan'}", 'status': 'none', 'created_at': '2023-08-08 14:25:24.841966', 'updated_at': None, 'class_name': 'string', 'function_name': 'Brand', 'response_error': 'publish'})	add
65	2023-08-12 15:12:06.77466	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': '1', 'number': '3', 'description': 'توضیح انبار گردانی', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': '1', 'number': '3', 'description': 'توضیح انبار گردانی', 'created_at': '2023-08-12 15:12:06.754011', 'deleted_at': 'None', 'refrence_id': 'string', 'unit_obj': {'id': 1, 'title': 'کیلوگرم'}, 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}, 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': 'string', 'model': 'string', 'title': 'string', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم'}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم'}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم'}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم'}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft ': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم'}}})	add
66	2023-08-14 13:02:54.441143	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': '330150000003130018911724', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره شبا قبلا ثبت شده است.')	add
76	2023-08-14 14:44:34.766342	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': 'ir3301500000031300189117124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
77	2023-08-14 14:45:19.904209	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '589210334748551', 'shaba_number': 'ir3301500000031300189117124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
78	2023-08-14 14:45:26.501299	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '5892103347428551', 'shaba_number': 'ir3301500000031300189117124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
79	2023-08-14 14:45:49.704011	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '5892103347428551', 'shaba_number': 'ir3301500000031300189117124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
80	2023-08-14 14:46:29.179475	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '5892103347428551', 'shaba_number': 'ir3301500000031300189117124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
81	2023-08-14 14:46:34.722602	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '5892103347428551', 'shaba_number': 'ir330150000003130018917124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'account_number': 'شماره حساب', 'card_number': '5892103347428551', 'shaba_number': 'ir330150000003130018917124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True, 'created_at': '2023-08-14 14:46:34.713599', 'deleted_at': 'None'})	add
82	2023-08-14 14:46:38.004997	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '5892103347428551', 'shaba_number': 'ir330150000003130018917124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره شبا قبلا ثبت شده است.')	add
83	2023-08-14 14:46:43.331978	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '5892103347428551', 'shaba_number': 'ir330151000003130018917124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره کارت قبلا ثبت شده است.')	add
84	2023-08-14 14:46:47.987752	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '5892103337428551', 'shaba_number': 'ir330151000003130018917124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره حساب قبلا ثبت شده است.')	add
85	2023-08-14 14:46:51.705267	repository.financ.account	add	\N	({'account_number': 'شماره حساب', 'card_number': '5892103337428551', 'shaba_number': 'ir330151000003130018917124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره حساب قبلا ثبت شده است.')	add
86	2023-08-14 14:46:59.107819	repository.financ.account	add	\N	({'account_number': '2 شماره حساب', 'card_number': '5892103337428551', 'shaba_number': 'ir330151000003130018917124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'account_number': '2 شماره حساب', 'card_number': '5892103337428551', 'shaba_number': 'ir330151000003130018917124', 'bank': 'سپه', 'type': 'string', 'title': 'حساب بانک سپه', 'is_actvie': True, 'created_at': '2023-08-14 14:46:59.098967', 'deleted_at': 'None'})	add
87	2023-08-16 15:40:12.024522	repository.product.unit	add	\N	({'title': 'd'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 4, 'title': 'd'})	add
88	2023-08-16 15:40:41.859273	repository.product.rate	add	\N	({'title': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 5, 'title': 'string'})	add
89	2023-08-16 15:40:51.468251	repository.product.rate	add	\N	({'title': 'string2'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 6, 'title': 'string2'})	add
90	2023-08-28 14:02:04.296689	repository.product.rate	add	\N	({'title': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 7, 'title': 'string'})	add
91	2023-08-31 11:07:38.53863	repository.brand.brand	add	\N	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-24 15:29:05.640664', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 34, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-08-31 11:07:38.525582', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-24 15:29:05.640664', 'isDraft ': 'true', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '70703', 'images': [], 'features': [], 'fileUses': ['string'], 'is_seo_url_ok': None, 'seo_url_last_response': None})	add
92	2023-08-31 11:34:18.491272	repository.brand.brand_image	add	\N	({'brand_id': 34, 'url': 'link', 'alt': 'my alt'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'brand_id': 34, 'url': 'link', 'alt': 'my alt', 'deleted_at': 'None', 'inserted_at': '2023-08-31 11:32:41.370229'})	add
93	2023-08-31 11:47:37.880581	repository.feature.feature	add	\N	({'title': 'اندازه', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 5, 'title': 'اندازه', 'show_up': True, 'inserted_at': '2023-08-31 11:47:37.864259', 'deleted_at': 'None', 'language': 'string'})	add
94	2023-08-31 11:51:41.379885	repository.feature.feature_values_category	add	\N	({'feature_value_id': 2, 'feature_id': 2, 'category_id': 'string', 'is_filter': True, 'feature_sort_id': 0, 'language': 'string', 'feature_value_sort_id': 0},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'feature_value_id': 2, 'feature_id': 2, 'category_id': 'string', 'is_filter': True, 'inserted_at': '2023-08-31 11:48:54.091604', 'deleted_at': 'None', 'feature_sort_id': 0, 'language': 'string', 'feature_value_sort_id': 0, 'feature_value_obj': {'id': 2, 'value': 'Intel', 'language': None}, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}})	add
95	2023-09-03 17:17:40.427753	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'ir33015000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
96	2023-09-03 17:21:03.095716	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'ir33015000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
97	2023-09-03 17:22:51.542423	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'ir33015000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
98	2023-09-03 17:23:58.391153	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'ir33015000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره شبا باید 16 رقمی باشد')	add
99	2023-09-03 17:29:05.948283	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'ir33015000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'مطابق الگو نیست')	add
100	2023-09-03 17:29:32.311703	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR1234567890123456789012', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره شبا اشتباه می باشد.')	add
101	2023-09-03 17:30:05.12939	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
102	2023-09-03 17:30:26.202483	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
103	2023-09-03 17:31:05.987625	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'invalid card')	add
104	2023-09-03 17:32:52.218302	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True, 'created_at': '2023-09-03 17:32:52.205377', 'deleted_at': 'None'})	add
105	2023-09-03 17:32:59.62636	repository.financ.account	add	\N	({'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'شماره شبا قبلا ثبت شده است.')	add
106	2023-09-10 11:36:53.570881	repository.financ.order_products	add	\N	({'product_id': 1, 'order_send_id': 'string', 'unit_price': 'string', 'num': 10, 'total_price': 'string', 'gain': 'string', 'send_by': 'string', 'tax': 'string', 'description': 'string', 'is_increase_balance': 't', 'gain_percentage': 'string', 'tax_percentage': 'string', 'refrence_id': 'string', 'order_id': 10},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'order_id': 10, 'product_id': 1, 'order_send_id': 'string', 'unit_price': 'string', 'num': 10, 'total_price': 'string', 'gain': 'string', 'send_by': 'string', 'tax': 'string', 'description': 'string', 'is_increase_balance': 't', 'gain_percentage': 'string', 'tax_percentage': 'string', 'deleted_at': 'None', 'refrence_id': 'string'})	add
107	2023-09-17 17:07:12.970972	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 5, 'type_name': 'خرید', 'increase_balance': 'true', 'increase_financial_balance': 'false', 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
108	2023-09-17 17:07:12.978354	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 6, 'type_name': 'فروش', 'increase_balance': 'false', 'increase_financial_balance': 'true', 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
109	2023-09-17 17:07:12.984495	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 7, 'type_name': 'برگشت از خرید', 'increase_balance': 'false', 'increase_financial_balance': 'true', 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
110	2023-09-17 17:07:12.991845	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 8, 'type_name': 'برگشت از فروش', 'increase_balance': 'true', 'increase_financial_balance': 'false', 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
111	2023-09-18 17:02:50.840488	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 9, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
112	2023-09-18 17:02:50.850457	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 10, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
113	2023-09-18 17:02:50.859072	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 11, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
114	2023-09-18 17:02:50.866209	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 12, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
115	2023-09-18 17:02:50.887704	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 13, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
116	2023-09-18 17:02:50.895122	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 14, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
117	2023-09-18 17:02:50.902923	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 15, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
118	2023-09-18 17:02:50.910105	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 16, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
119	2023-09-18 17:02:50.935186	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 17, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
120	2023-09-18 17:02:50.943351	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 18, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
121	2023-09-18 17:02:50.953033	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 19, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
122	2023-09-18 17:02:50.962542	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 20, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
123	2023-09-18 17:02:50.988261	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 21, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
395	2023-09-20 15:42:59.858021	repository.product.price_config_term	add	\N	({'config': 'none'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'config': 'none'})	add
399	2023-09-20 17:37:09.971885	repository.product.product_feature_values	add	\N	({'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'duplicate data ! ')	add
124	2023-09-18 17:02:50.997657	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 22, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
125	2023-09-18 17:02:51.008432	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 23, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
126	2023-09-18 17:02:51.018491	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 24, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
127	2023-09-18 17:02:51.0384	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 25, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
128	2023-09-18 17:02:51.04417	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 26, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
129	2023-09-18 17:02:51.052034	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 27, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
130	2023-09-18 17:02:51.059766	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 28, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
131	2023-09-18 17:02:51.075371	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 29, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
132	2023-09-18 17:02:51.08059	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 30, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
133	2023-09-18 17:02:51.085981	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 31, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
134	2023-09-18 17:02:51.090964	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 32, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
135	2023-09-18 17:08:27.766386	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 33, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
400	2023-09-20 17:38:26.881962	repository.product.product_feature_values	add	\N	({'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'duplicate data ! ')	add
136	2023-09-18 17:08:27.772161	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 34, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
137	2023-09-18 17:08:27.776863	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 35, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
138	2023-09-18 17:08:27.781465	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 36, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
139	2023-09-18 17:08:27.915689	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 37, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
140	2023-09-18 17:08:27.920886	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 38, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
141	2023-09-18 17:08:27.925324	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 39, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
142	2023-09-18 17:08:27.929812	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 40, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
143	2023-09-18 17:08:27.951937	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 41, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
144	2023-09-18 17:08:27.955946	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 42, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
145	2023-09-18 17:08:27.959817	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 43, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
146	2023-09-18 17:08:27.963808	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 44, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
147	2023-09-18 17:09:26.518302	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 45, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
401	2023-09-20 17:38:53.719301	repository.product.product_feature_values	add	\N	({'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'duplicate data ! ')	add
148	2023-09-18 17:09:26.524146	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 46, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
149	2023-09-18 17:09:26.528929	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 47, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
150	2023-09-18 17:09:26.533478	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 48, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
151	2023-09-18 17:09:26.684302	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 49, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
152	2023-09-18 17:09:26.691166	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 50, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
153	2023-09-18 17:09:26.696031	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 51, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
154	2023-09-18 17:09:26.700876	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 52, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
155	2023-09-18 17:09:26.726541	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 53, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
156	2023-09-18 17:09:26.731736	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 54, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
157	2023-09-18 17:09:26.736696	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 55, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
158	2023-09-18 17:09:26.741593	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 56, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
159	2023-09-18 17:09:27.164075	repository.warehouse.transfer	add	\N	({'warehouse_manager_origin_id': '1', 'warehouse_manager_goal_id': '1', 'code': 'null-record', 'title': 'null-record', 'submit_at': 'now()', 'receive_at': 'now()', 'warehouse_origin_id': 2, 'warehouse_goal_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 1, 'warehouse_origin_id': '2', 'warehouse_manager_origin_id': '1', 'code': 'null-record', 'title': 'null-record', 'warehouse_goal_id': '2', 'warehouse_manager_goal_id': '1', 'created_at': '2023-09-18 17:09:27.155766', 'submit_at': '2023-09-18 17:09:27.155766', 'receive_at': '2023-09-18 17:09:27.155766', 'deleted_at': 'None', 'products': (True, [], 0)})	add
402	2023-09-20 17:38:54.801139	repository.product.product_feature_values	add	\N	({'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'duplicate data ! ')	add
160	2023-09-18 17:10:40.4181	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 57, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
161	2023-09-18 17:10:40.427621	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 58, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
162	2023-09-18 17:10:40.432371	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 59, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
163	2023-09-18 17:10:40.437248	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 60, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
164	2023-09-18 17:10:40.570435	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 61, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
165	2023-09-18 17:10:40.57642	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 62, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
166	2023-09-18 17:10:40.580711	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 63, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
167	2023-09-18 17:10:40.584707	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 64, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
168	2023-09-18 17:10:40.604031	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 65, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
169	2023-09-18 17:10:40.608635	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 66, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
170	2023-09-18 17:10:40.613687	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 67, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
171	2023-09-18 17:10:40.618599	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 68, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
419	2023-09-26 13:58:58.446969	repository.category.category_list	add	\N	({'product_id': 1, 'category_id': 'موبایل', 'order_num': 1},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'product_id': 1, 'category_id': 'موبایل', 'order_num': 1})	add
172	2023-09-18 17:11:22.308299	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 69, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
173	2023-09-18 17:11:22.316365	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 70, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
174	2023-09-18 17:11:22.321288	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 71, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
175	2023-09-18 17:11:22.325636	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 72, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
176	2023-09-18 17:11:22.468343	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 73, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
177	2023-09-18 17:11:22.474262	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 74, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
178	2023-09-18 17:11:22.478646	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 75, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
179	2023-09-18 17:11:22.483264	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 76, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
180	2023-09-18 17:11:22.50377	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 77, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
181	2023-09-18 17:11:22.508527	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 78, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
182	2023-09-18 17:11:22.513391	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 79, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
183	2023-09-18 17:11:22.518776	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 80, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
420	2023-09-26 17:56:15.538562	repository.feature.feature	add	\N	({'title': 'string', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
421	2023-09-27 10:44:31.331856	repository.feature.feature	add	\N	({'title': 'string', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
184	2023-09-18 17:12:28.74213	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 81, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
185	2023-09-18 17:12:28.747574	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 82, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
186	2023-09-18 17:12:28.756495	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 83, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
187	2023-09-18 17:12:28.761453	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 84, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
188	2023-09-18 17:12:28.902539	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 85, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
189	2023-09-18 17:12:28.908766	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 86, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
190	2023-09-18 17:12:28.913574	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 87, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
191	2023-09-18 17:12:28.917742	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 88, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
192	2023-09-18 17:12:28.940976	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 89, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
193	2023-09-18 17:12:28.945247	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 90, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
194	2023-09-18 17:12:28.949152	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 91, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
195	2023-09-18 17:12:28.953178	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 92, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
422	2023-09-27 10:45:39.354649	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
423	2023-09-27 10:49:48.029509	repository.feature.feature	add	\N	({'title': 'string', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
196	2023-09-18 17:13:41.806963	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 93, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
197	2023-09-18 17:13:41.813138	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 94, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
198	2023-09-18 17:13:41.818178	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 95, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
199	2023-09-18 17:13:41.823199	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 96, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
200	2023-09-18 17:13:41.979054	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 97, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
201	2023-09-18 17:13:41.987008	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 98, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
202	2023-09-18 17:13:41.993274	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 99, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
203	2023-09-18 17:13:41.999654	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 100, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
204	2023-09-18 17:13:42.030279	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 101, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
205	2023-09-18 17:13:42.036297	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 102, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
206	2023-09-18 17:13:42.042131	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 103, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
207	2023-09-18 17:13:42.049174	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 104, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
424	2023-09-27 14:12:59.493531	repository.feature.feature	add	\N	({'title': 'string', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
208	2023-09-18 17:14:21.64503	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 105, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
209	2023-09-18 17:14:21.651563	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 106, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
210	2023-09-18 17:14:21.656245	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 107, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
211	2023-09-18 17:14:21.660617	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 108, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
212	2023-09-18 17:14:21.786301	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 109, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
213	2023-09-18 17:14:21.791631	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 110, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
214	2023-09-18 17:14:21.796011	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 111, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
215	2023-09-18 17:14:21.800452	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 112, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
216	2023-09-18 17:14:21.823992	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 113, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
217	2023-09-18 17:14:21.828688	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 114, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
218	2023-09-18 17:14:21.83343	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 115, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
219	2023-09-18 17:14:21.837951	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 116, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
425	2023-09-27 14:34:47.143687	repository.feature.feature	add	\N	({'title': 'string', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
220	2023-09-18 17:20:13.038753	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 117, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
221	2023-09-18 17:20:13.044675	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 118, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
222	2023-09-18 17:20:13.049456	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 119, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
223	2023-09-18 17:20:13.054552	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 120, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
224	2023-09-18 17:20:13.181501	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 121, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
225	2023-09-18 17:20:13.187153	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 122, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
226	2023-09-18 17:20:13.191907	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 123, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
227	2023-09-18 17:20:13.196989	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 124, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
228	2023-09-18 17:20:13.217256	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 125, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
229	2023-09-18 17:20:13.221643	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 126, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
230	2023-09-18 17:20:13.22597	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 127, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
231	2023-09-18 17:20:13.230565	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 128, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
426	2023-09-27 14:51:57.226355	repository.feature.feature	add	\N	({'title': 'string', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
232	2023-09-18 17:21:13.055664	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 129, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
233	2023-09-18 17:21:13.061046	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 130, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
234	2023-09-18 17:21:13.065601	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 131, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
235	2023-09-18 17:21:13.070441	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 132, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
236	2023-09-18 17:21:13.195704	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 133, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
237	2023-09-18 17:21:13.202739	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 134, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
238	2023-09-18 17:21:13.208377	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 135, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
239	2023-09-18 17:21:13.213842	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 136, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
240	2023-09-18 17:21:13.240314	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 137, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
241	2023-09-18 17:21:13.245623	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 138, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
242	2023-09-18 17:21:13.250548	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 139, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
243	2023-09-18 17:21:13.254863	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 140, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
427	2023-09-27 14:54:30.743788	repository.feature.feature	add	\N	({'title': 'strinhhhhg', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 9, 'title': 'strinhhhhg', 'show_up': True, 'inserted_at': '2023-09-27 14:54:30.735417', 'deleted_at': 'None', 'language': 'string'})	add
244	2023-09-18 17:21:13.750624	repository.warehouse.wastage	add	\N	({'warehouse_manager_id': '', 'number': 0, 'description': 'null-record', 'refrence_id': '1', 'product_id': 1, 'warehouse_id': 2, 'unit_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 2, 'unit_id': 4, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': '', 'number': '0', 'description': 'null-record', 'created_at': '2023-09-18 17:21:13.718385', 'deleted_at': 'None', 'refrence_id': '1', 'unit_obj': {'id': 4, 'title': 'تعداد', 'language': None}, 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}, 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': 'string', 'model': 'string', 'title': 'string', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}}})	add
245	2023-09-19 10:22:43.592306	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 141, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
246	2023-09-19 10:22:43.604696	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 142, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
247	2023-09-19 10:22:43.614745	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 143, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
248	2023-09-19 10:22:43.624251	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 144, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
249	2023-09-19 10:22:43.912926	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 145, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
250	2023-09-19 10:22:43.925438	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 146, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
251	2023-09-19 10:22:43.934937	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 147, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
252	2023-09-19 10:22:43.944276	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 148, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
253	2023-09-19 10:22:43.99702	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 149, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
254	2023-09-19 10:22:44.007573	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 150, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
510	2023-09-30 12:40:51.977009	repository.feature.feature	add	\N	({'language': 'assasa', 'show_up': True, 'title': 'sasasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
255	2023-09-19 10:22:44.017829	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 151, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
256	2023-09-19 10:22:44.028129	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 152, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
257	2023-09-19 11:31:13.339125	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 153, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
258	2023-09-19 11:31:13.346655	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 154, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
259	2023-09-19 11:31:13.353365	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 155, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
260	2023-09-19 11:31:13.358978	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 156, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
261	2023-09-19 11:31:13.5128	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 157, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
262	2023-09-19 11:31:13.519887	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 158, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
263	2023-09-19 11:31:13.52601	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 159, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
264	2023-09-19 11:31:13.531642	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 160, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
265	2023-09-19 11:31:13.556107	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 161, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
266	2023-09-19 11:31:13.561614	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 162, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
428	2023-09-27 15:01:14.42185	repository.feature.feature	add	\N	({'language': 'sadsad', 'title': 'sadsad', 'show_up': True},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 10, 'title': 'sadsad', 'show_up': True, 'inserted_at': '2023-09-27 15:01:14.416940', 'deleted_at': 'None', 'language': 'sadsad'})	add
267	2023-09-19 11:31:13.566885	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 163, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
268	2023-09-19 11:31:13.573958	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 164, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
269	2023-09-19 11:34:19.542862	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 165, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
270	2023-09-19 11:34:19.548183	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 166, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
271	2023-09-19 11:34:19.552709	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 167, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
272	2023-09-19 11:34:19.556747	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 168, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
273	2023-09-19 11:34:19.691204	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 169, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
274	2023-09-19 11:34:19.696918	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 170, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
275	2023-09-19 11:34:19.701814	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 171, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
276	2023-09-19 11:34:19.706661	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 172, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
277	2023-09-19 11:34:19.727187	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 173, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
278	2023-09-19 11:34:19.731381	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 174, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
429	2023-09-27 15:10:19.232001	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 11, 'title': '', 'show_up': False, 'inserted_at': '2023-09-27 15:10:19.225857', 'deleted_at': 'None', 'language': ''})	add
279	2023-09-19 11:34:19.735703	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 175, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
280	2023-09-19 11:34:19.740307	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 176, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
281	2023-09-19 11:36:24.62736	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 177, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
282	2023-09-19 11:36:24.633079	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 178, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
283	2023-09-19 11:36:24.637648	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 179, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
284	2023-09-19 11:36:24.642559	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 180, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
285	2023-09-19 11:36:24.775321	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 181, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
286	2023-09-19 11:36:24.781208	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 182, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
287	2023-09-19 11:36:24.78661	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 183, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
288	2023-09-19 11:36:24.792106	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 184, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
289	2023-09-19 11:36:24.818007	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 185, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
290	2023-09-19 11:36:24.822486	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 186, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
430	2023-09-27 15:10:23.978473	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
291	2023-09-19 11:36:24.827055	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 187, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
292	2023-09-19 11:36:24.83178	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 188, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
293	2023-09-19 12:00:57.215074	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 189, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
294	2023-09-19 12:00:57.220607	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 190, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
295	2023-09-19 12:00:57.224729	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 191, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
296	2023-09-19 12:00:57.228856	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 192, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
297	2023-09-19 12:01:09.897664	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 193, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
298	2023-09-19 12:01:09.903742	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 194, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
299	2023-09-19 12:01:09.908979	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 195, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
300	2023-09-19 12:01:09.914024	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 196, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
301	2023-09-19 12:01:10.049109	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 197, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
302	2023-09-19 12:01:10.055699	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 198, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
431	2023-09-27 15:10:39.714352	repository.feature.feature	add	\N	({'language': 'dsadsa', 'show_up': True, 'title': 'ssasadsadsad'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 12, 'title': 'ssasadsadsad', 'show_up': True, 'inserted_at': '2023-09-27 15:10:39.708313', 'deleted_at': 'None', 'language': 'dsadsa'})	add
303	2023-09-19 12:01:10.06062	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 199, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
304	2023-09-19 12:01:10.066061	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 200, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
305	2023-09-19 12:01:10.090143	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 201, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
306	2023-09-19 12:01:10.094771	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 202, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
307	2023-09-19 12:01:10.098917	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 203, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
308	2023-09-19 12:01:10.103274	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 204, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
309	2023-09-19 12:01:12.054269	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 205, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
310	2023-09-19 12:01:12.059606	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 206, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
311	2023-09-19 12:01:12.064065	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 207, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
312	2023-09-19 12:01:12.068746	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 208, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
313	2023-09-19 12:03:07.562848	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 209, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
314	2023-09-19 12:03:07.568372	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 210, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
432	2023-09-27 15:10:43.364772	repository.feature.feature	add	\N	({'language': 'dsadsa', 'show_up': False, 'title': 'ssasadsadsad'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
315	2023-09-19 12:03:07.573068	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 211, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
316	2023-09-19 12:03:07.578043	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 212, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
317	2023-09-19 12:03:07.746341	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 213, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
318	2023-09-19 12:03:07.752788	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 214, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
319	2023-09-19 12:03:07.757979	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 215, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
320	2023-09-19 12:03:07.762814	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 216, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
321	2023-09-19 12:03:07.788082	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 217, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
322	2023-09-19 12:03:07.793306	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 218, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
323	2023-09-19 12:03:07.798233	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 219, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
324	2023-09-19 12:03:07.802927	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 220, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
325	2023-09-19 12:03:10.233396	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 221, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
326	2023-09-19 12:03:10.238535	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 222, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
433	2023-09-27 15:27:06.295543	repository.feature.feature	add	\N	({'language': 'Amirreza', 'show_up': True, 'title': 'aminian.aasddddddddddd@gmail.com'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 13, 'title': 'aminian.aasddddddddddd@gmail.com', 'show_up': True, 'inserted_at': '2023-09-27 15:27:06.289328', 'deleted_at': 'None', 'language': 'Amirreza'})	add
327	2023-09-19 12:03:10.242659	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 223, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
328	2023-09-19 12:03:10.246984	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 224, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
329	2023-09-19 12:04:00.665108	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 225, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
330	2023-09-19 12:04:00.672931	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 226, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
331	2023-09-19 12:04:00.680396	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 227, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
332	2023-09-19 12:04:00.689703	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 228, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
333	2023-09-19 12:04:00.966626	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 229, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
334	2023-09-19 12:04:00.978348	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 230, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
335	2023-09-19 12:04:00.988891	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 231, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
336	2023-09-19 12:04:00.998159	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 232, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
337	2023-09-19 12:04:01.046631	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 233, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
338	2023-09-19 12:04:01.056838	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 234, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
434	2023-09-27 15:38:42.550602	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': True, 'title': 'asaa@g'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 14, 'title': 'asaa@g', 'show_up': True, 'inserted_at': '2023-09-27 15:38:42.538529', 'deleted_at': 'None', 'language': 'Adiineeeeeeeee'})	add
339	2023-09-19 12:04:01.067324	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 235, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
340	2023-09-19 12:04:01.08038	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 236, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
341	2023-09-19 12:04:06.157035	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 237, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
342	2023-09-19 12:04:06.168888	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 238, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
343	2023-09-19 12:04:06.179058	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 239, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
344	2023-09-19 12:04:06.189891	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 240, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
345	2023-09-19 12:04:29.949216	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 241, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
346	2023-09-19 12:04:29.955865	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 242, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
347	2023-09-19 12:04:29.961791	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 243, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
348	2023-09-19 12:04:29.967553	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 244, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
349	2023-09-19 12:04:30.235238	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 245, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
350	2023-09-19 12:04:30.240858	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 246, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
435	2023-09-27 15:40:51.85883	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': True, 'title': 'sasas@gmail.com'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 15, 'title': 'sasas@gmail.com', 'show_up': True, 'inserted_at': '2023-09-27 15:40:04.482463', 'deleted_at': 'None', 'language': 'Adiineeeeeeeee'})	add
351	2023-09-19 12:04:30.245722	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 247, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
352	2023-09-19 12:04:30.250924	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 248, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
353	2023-09-19 12:04:30.272875	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 249, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
354	2023-09-19 12:04:30.277261	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 250, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
355	2023-09-19 12:04:30.28199	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 251, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
356	2023-09-19 12:04:30.286728	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 252, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
357	2023-09-19 12:04:31.00392	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 253, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
358	2023-09-19 12:04:31.010124	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 254, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
359	2023-09-19 12:04:31.015743	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 255, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
360	2023-09-19 12:04:31.02137	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 256, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
361	2023-09-19 12:05:34.768945	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 257, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
362	2023-09-19 12:05:34.777621	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 258, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
462	2023-09-28 18:10:55.068369	repository.financ.account	add	\N	({'account_number': 'null-record', 'card_number': 'null-record', 'shaba_number': 'null-record', 'bank': 'null-record', 'type': 'null-record', 'title': 'null-record', 'is_active': False},)	{'OPERATOR': 'system'}			add	system	(False, 'شماره شبا اشتباه می باشد.')	add
363	2023-09-19 12:05:34.784434	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 259, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
364	2023-09-19 12:05:34.791822	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 260, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
365	2023-09-19 12:05:35.193862	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 261, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
366	2023-09-19 12:05:35.206832	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 262, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
367	2023-09-19 12:05:35.216694	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 263, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
368	2023-09-19 12:05:35.226892	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 264, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
369	2023-09-19 12:05:35.276539	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 265, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
370	2023-09-19 12:05:35.28728	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 266, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
371	2023-09-19 12:05:35.297549	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 267, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
372	2023-09-19 12:05:35.30798	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 268, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
373	2023-09-19 12:05:37.786539	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 269, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
374	2023-09-19 12:05:37.792369	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 270, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
494	2023-09-30 10:43:42.487407	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': True, 'title': '3223232323'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 22, 'title': '3223232323', 'show_up': True, 'inserted_at': '2023-09-30 10:43:35.756504', 'deleted_at': 'None', 'language': 'Adiineeeeeeeee'})	add
375	2023-09-19 12:05:37.797075	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 271, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
376	2023-09-19 12:05:37.803125	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 272, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
377	2023-09-19 12:08:24.996075	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 273, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
378	2023-09-19 12:08:25.001789	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 274, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
379	2023-09-19 12:08:25.006385	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 275, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
380	2023-09-19 12:08:25.011125	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 276, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
381	2023-09-19 12:08:25.219858	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 277, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
382	2023-09-19 12:08:25.229556	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 278, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
383	2023-09-19 12:08:25.234033	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 279, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
384	2023-09-19 12:08:25.238323	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 280, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
385	2023-09-19 12:08:25.260186	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 281, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
386	2023-09-19 12:08:25.26503	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 282, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
495	2023-09-30 10:45:29.824829	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
387	2023-09-19 12:08:25.269587	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 283, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
388	2023-09-19 12:08:25.276808	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 284, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
389	2023-09-19 12:08:26.802991	repository.financ.order_type	add	\N	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 285, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1})	add
390	2023-09-19 12:08:26.808275	repository.financ.order_type	add	\N	({'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 286, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2})	add
391	2023-09-19 12:08:26.812659	repository.financ.order_type	add	\N	({'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 287, 'type_name': 'برگشت از خرید', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.', 'type_id': 3})	add
392	2023-09-19 12:08:26.817257	repository.financ.order_type	add	\N	({'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 288, 'type_name': 'برگشت از فروش', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.', 'type_id': 4})	add
393	2023-09-19 13:52:48.550852	repository.financ.order	update_is_close	\N	(True,)	{'id': 10, 'OPERATOR': 'system'}	{'id': 10, 'account_id': 3, 'transaction_at': '2023-09-10 11:33:37', 'due_date': '2023-09-10 11:33:37', 'user_id': 'string', 'factor_code': 'string', 'factor_image': 'string', 'title': 'string', 'finall_transportation': '0.0', 'finall_price': 0.0, 'finall_gain': 0.0, 'finall_tax': 0.0, 'general_gain': 0.0, 'total_price': 0.0, 'orders_status': 'string', 'peyment_status': 'پرداخت نشده', 'type': 'string', 'payment_type': 'string', 'orders_code': 'string', 'number': 'string', 'created_at': '2023-09-10 11:36:53.545516', 'code': 'vuBvhgUoSU', 'is_increase_financial_balance': False, 'type_id': '1', 'deleted_at': 'None', 'send_status': 'ارسال نشده', 'is_close': None, 'account_obj': {'id': 3, 'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True, 'created_at': '2023-09-03 17:32:52.205377', 'deleted_at': 'None'}, 'order_type_obj': (True, [{'id': 5, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1}], 1), 'products': [{'id': 3, 'order_id': 10, 'product_id': 1, 'order_send_id': 'string', 'unit_price': 'string', 'num': 10, 'total_price': 'string', 'gain': 'string', 'send_by': 'string', 'tax': 'string', 'description': 'string', 'is_increase_balance': 't', 'gain_percentage': 'string', 'tax_percentage': 'string', 'deleted_at': 'None', 'refrence_id': 'string'}]}	{'id': 10, 'account_id': 3, 'transaction_at': '2023-09-10 11:33:37', 'due_date': '2023-09-10 11:33:37', 'user_id': 'string', 'factor_code': 'string', 'factor_image': 'string', 'title': 'string', 'finall_transportation': '0.0', 'finall_price': 0.0, 'finall_gain': 0.0, 'finall_tax': 0.0, 'general_gain': 0.0, 'total_price': 0.0, 'orders_status': 'string', 'peyment_status': 'پرداخت نشده', 'type': 'string', 'payment_type': 'string', 'orders_code': 'string', 'number': 'string', 'created_at': '2023-09-10 11:36:53.545516', 'code': 'vuBvhgUoSU', 'is_increase_financial_balance': False, 'type_id': '1', 'deleted_at': 'None', 'send_status': 'ارسال نشده', 'is_close': True, 'account_obj': {'id': 3, 'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True, 'created_at': '2023-09-03 17:32:52.205377', 'deleted_at': 'None'}, 'order_type_obj': (True, [{'id': 5, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1}], 1), 'products': [{'id': 3, 'order_id': 10, 'product_id': 1, 'order_send_id': 'string', 'unit_price': 'string', 'num': 10, 'total_price': 'string', 'gain': 'string', 'send_by': 'string', 'tax': 'string', 'description': 'string', 'is_increase_balance': 't', 'gain_percentage': 'string', 'tax_percentage': 'string', 'deleted_at': 'None', 'refrence_id': 'string'}]}	update	system	(True, {'id': 10, 'account_id': 3, 'transaction_at': '2023-09-10 11:33:37', 'due_date': '2023-09-10 11:33:37', 'user_id': 'string', 'factor_code': 'string', 'factor_image': 'string', 'title': 'string', 'finall_transportation': '0.0', 'finall_price': 0.0, 'finall_gain': 0.0, 'finall_tax': 0.0, 'general_gain': 0.0, 'total_price': 0.0, 'orders_status': 'string', 'peyment_status': 'پرداخت نشده', 'type': 'string', 'payment_type': 'string', 'orders_code': 'string', 'number': 'string', 'created_at': '2023-09-10 11:36:53.545516', 'code': 'vuBvhgUoSU', 'is_increase_financial_balance': False, 'type_id': '1', 'deleted_at': 'None', 'send_status': 'ارسال نشده', 'is_close': True, 'account_obj': {'id': 3, 'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True, 'created_at': '2023-09-03 17:32:52.205377', 'deleted_at': 'None'}, 'order_type_obj': (True, [{'id': 5, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1}], 1), 'products': [{'id': 3, 'order_id': 10, 'product_id': 1, 'order_send_id': 'string', 'unit_price': 'string', 'num': 10, 'total_price': 'string', 'gain': 'string', 'send_by': 'string', 'tax': 'string', 'description': 'string', 'is_increase_balance': 't', 'gain_percentage': 'string', 'tax_percentage': 'string', 'deleted_at': 'None', 'refrence_id': 'string'}]})	main
394	2023-09-19 13:57:29.09252	repository.feature.feature	add	\N	({'title': 'جنس', 'show_up': False, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 6, 'title': 'جنس', 'show_up': False, 'inserted_at': '2023-09-19 13:56:19.193064', 'deleted_at': 'None', 'language': 'string'})	add
396	2023-09-20 17:26:18.495641	repository.product.product_feature_values	add	\N	({'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': '1', 'model': 'string', 'title': 'پفک', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}}, 'feature_obj': {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 5, 'value': '2 ترابایت', 'language': None}})	add
397	2023-09-20 17:27:40.65467	repository.product.product_feature_values	add	\N	({'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5})	add
398	2023-09-20 17:28:20.827285	repository.product.product_feature_values	add	\N	({'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5})	add
496	2023-09-30 10:46:02.649249	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
403	2023-09-21 16:24:41.636211	repository.category.category_brand_price	add	\N	({'brand_id': 35, 'category': 'string', 'prcentage_floor': 1, 'prcentage_ceiling': 5},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'brand_id': 35, 'category': 'string', 'prcentage_floor': 1.0, 'prcentage_ceiling': 5.0, 'brand_obj': {'id': 35, 'title': 'null-record', 'title_en': 'null-record', 'logo': 'null-record', 'alt_logo': 'null-record', 'description': 'null-record', 'video': 'null-record', 'deleted_at': 'None', 'inserted_at': '2023-09-21 16:20:23.762635', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-09-21 16:20:23.762635', 'isDraft': 'false', 'language': '', 'viewMode': '', 'seo': '', 'refrence_id': '16087', 'images': [], 'features': [], 'fileUses': ['null-record'], 'is_seo_url_ok': None, 'seo_url_last_response': None}})	add
404	2023-09-25 12:55:07.190725	repository.feature.feature	add	\N	({'title': 'string', 'show_up': True, 'language': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 7, 'title': 'string', 'show_up': True, 'inserted_at': '2023-09-25 11:58:27.693892', 'deleted_at': 'None', 'language': 'string'})	add
405	2023-09-25 12:59:37.29536	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 8, 'title': 'Test-data', 'show_up': True, 'inserted_at': '2023-09-25 12:57:53.223213', 'deleted_at': 'None', 'language': 'English'})	add
406	2023-09-25 13:00:50.461244	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
407	2023-09-25 13:00:52.601915	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
408	2023-09-25 13:00:53.241412	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
409	2023-09-25 13:00:53.432478	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
410	2023-09-25 13:00:57.269399	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
411	2023-09-25 13:01:03.464371	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
412	2023-09-25 13:01:07.65559	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
413	2023-09-25 13:07:44.079185	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
414	2023-09-25 14:19:29.406571	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
415	2023-09-25 14:20:45.354523	repository.feature.feature	add	\N	({'title': 'Test-data', 'show_up': True, 'language': 'English'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
416	2023-09-25 17:19:27.984373	repository.product.product_price	add	\N	({'product_id': 1, 'order_id': 10, 'workmate': 1100, 'sell_ceiling': 1200, 'sell_floor': 1100, 'percentage_ceiling': 20, 'percentage_floor': 10, 'balance': 8, 'sell': 1180, 'is_active': True, 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'unit_id': 1, 'buy': 1000, 'sell_ai': 0, 'percentage_ai': 0},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1200.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1180.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': '1', 'model': 'string', 'title': 'پفک', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'product_feature_values_obj': [{'id': 1, 'product_id': 1, 'feature_id': {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'}, 'refrence_id': 'string', 'feature_value_obj': {'id': 5, 'value': '2 ترابایت', 'language': None}}], 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}}, 'order_obj': {'id': 10, 'account_id': 3, 'transaction_at': '2023-09-10 11:33:37', 'due_date': '2023-09-10 11:33:37', 'user_id': 'string', 'factor_code': 'string', 'factor_image': 'string', 'title': 'string', 'finall_transportation': '0', 'finall_price': 10000, 'finall_gain': 0, 'finall_tax': 0, 'general_gain': 0, 'total_price': 0, 'orders_status': 'string', 'peyment_status': 'پرداخت نشده', 'type': 'خرید', 'payment_type': 'string', 'orders_code': 'string', 'number': 'string', 'created_at': '2023-09-10 11:36:53.545516', 'code': 'vuBvhgUoSU', 'is_increase_financial_balance': False, 'type_id': '1', 'deleted_at': 'None', 'send_status': 'ارسال نشده', 'is_close': True, 'account_obj': {'id': 3, 'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True, 'created_at': '2023-09-03 17:32:52.205377', 'deleted_at': 'None'}, 'order_type_obj': (True, [{'id': 5, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1}], 1), 'products': [{'id': 3, 'order_id': 10, 'product_id': 1, 'order_send_id': 'string', 'unit_price': 1000, 'num': 10, 'total_price': 10000, 'gain': 0, 'send_by': 'string', 'tax': 0, 'description': 'string', 'is_increase_balance': 't', 'gain_percentage': 0, 'tax_percentage': 0, 'deleted_at': 'None', 'refrence_id': 'string'}]}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}})	add
417	2023-09-25 17:19:44.262338	repository.product.product_price	add	\N	({'product_id': 1, 'order_id': 10, 'workmate': 1100, 'sell_ceiling': 1200, 'sell_floor': 1100, 'percentage_ceiling': 20, 'percentage_floor': 10, 'balance': 8, 'sell': 1180, 'is_active': True, 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'unit_id': 1, 'buy': 1000, 'sell_ai': 0, 'percentage_ai': 0},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1200.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1180.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:44.204892', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': '1', 'model': 'string', 'title': 'پفک', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'product_feature_values_obj': [{'id': 1, 'product_id': 1, 'feature_id': {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'}, 'refrence_id': 'string', 'feature_value_obj': {'id': 5, 'value': '2 ترابایت', 'language': None}}], 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}}, 'order_obj': {'id': 10, 'account_id': 3, 'transaction_at': '2023-09-10 11:33:37', 'due_date': '2023-09-10 11:33:37', 'user_id': 'string', 'factor_code': 'string', 'factor_image': 'string', 'title': 'string', 'finall_transportation': '0', 'finall_price': 10000, 'finall_gain': 0, 'finall_tax': 0, 'general_gain': 0, 'total_price': 0, 'orders_status': 'string', 'peyment_status': 'پرداخت نشده', 'type': 'خرید', 'payment_type': 'string', 'orders_code': 'string', 'number': 'string', 'created_at': '2023-09-10 11:36:53.545516', 'code': 'vuBvhgUoSU', 'is_increase_financial_balance': False, 'type_id': '1', 'deleted_at': 'None', 'send_status': 'ارسال نشده', 'is_close': True, 'account_obj': {'id': 3, 'account_number': '101001', 'card_number': '5892101334748551', 'shaba_number': 'IR330150000003130018911724', 'bank': 'سپه', 'type': '1', 'title': 'بانک سپه', 'is_actvie': True, 'created_at': '2023-09-03 17:32:52.205377', 'deleted_at': 'None'}, 'order_type_obj': (True, [{'id': 5, 'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1}], 1), 'products': [{'id': 3, 'order_id': 10, 'product_id': 1, 'order_send_id': 'string', 'unit_price': 1000, 'num': 10, 'total_price': 10000, 'gain': 0, 'send_by': 'string', 'tax': 0, 'description': 'string', 'is_increase_balance': 't', 'gain_percentage': 0, 'tax_percentage': 0, 'deleted_at': 'None', 'refrence_id': 'string'}]}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}})	add
418	2023-09-26 11:19:27.924413	repository.product.price_feature_values	add	\N	({'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}})	add
436	2023-09-28 15:17:14.535256	repository.product.product_price	updatePrice	\N	({'workmate': 3850.0, 'sell': 4130.0, 'sell_ceiling': 4200.0, 'sell_floor': 3850.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1200.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1180.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '3850.0', 'sell_ceiling': 4200.0, 'sell_floor': 3850.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 4130.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '3850.0', 'sell_ceiling': 4200.0, 'sell_floor': 3850.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 4130.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
458	2023-09-28 17:52:55.777522	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 4, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 17:52:55.766105', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
437	2023-09-28 15:19:01.14488	repository.product.product_price	updatePrice	\N	({'workmate': -5775.0, 'sell': -6195.0, 'sell_ceiling': -6300.0, 'sell_floor': -5775.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '3850.0', 'sell_ceiling': 4200.0, 'sell_floor': 3850.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 4130.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '-5775.0', 'sell_ceiling': -6300.0, 'sell_floor': -5775.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': -6195.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '-5775.0', 'sell_ceiling': -6300.0, 'sell_floor': -5775.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': -6195.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
438	2023-09-28 15:19:01.160781	repository.financ.log_price_action	add	\N	({'product_price_id': 2, 'action': 'update', 'category_brand_price_action_id': 6},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 1, 'category_brand_price_action_id': 6, 'action': 'update', 'product_price_id': 2, 'created_at': '2023-09-28 15:19:01.157012', 'category_brand_price_action_obj': {'id': 6, 'category_id': 'موبایل', 'is_increase': False, 'percentage': 250.0, 'brand_id': 35, 'created_at': datetime.datetime(2023, 9, 28, 15, 19, 1, 39525), 'self_id': 0}})	add
439	2023-09-28 15:55:25.483993	repository.product.product_price	updatePrice	\N	({'workmate': 1100.0, 'sell': 1100.0, 'sell_ceiling': 1100.0, 'sell_floor': 1100.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1000.0', 'sell_ceiling': 1000.0, 'sell_floor': 1000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1100.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1100.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1100.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1100.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
440	2023-09-28 15:55:25.498395	repository.financ.log_price_action	add	\N	({'product_price_id': 2, 'action': 'update', 'category_brand_price_action_id': 7, 'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 2, 'category_brand_price_action_id': 7, 'action': 'update', 'product_price_id': 2, 'created_at': '2023-09-28 15:55:25.495002', 'category_brand_price_action_obj': {'id': 7, 'category_id': 'موبایل', 'is_increase': True, 'percentage': 10.0, 'brand_id': 35, 'created_at': datetime.datetime(2023, 9, 28, 15, 55, 25, 368409), 'self_id': 0}, 'workmate': None, 'sell': None, 'sell_ceiling': None, 'sell_floor': None})	add
441	2023-09-28 16:00:13.592775	repository.product.product_price	updatePrice	\N	({'workmate': None, 'sell': None, 'sell_ceiling': None, 'sell_floor': None},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1100.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1100.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': 'None', 'sell_ceiling': None, 'sell_floor': None, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': None, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': 'None', 'sell_ceiling': None, 'sell_floor': None, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': None, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
459	2023-09-28 18:09:50.734935	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 5, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:09:50.724520', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
501	2023-09-30 10:55:49.29484	repository.feature.feature	add	\N	({'language': 'assaassa', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
442	2023-09-28 16:02:38.319897	repository.product.product_price	updatePrice	\N	({'workmate': 1100.0, 'sell': 1100.0, 'sell_ceiling': 1100.0, 'sell_floor': 1100.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1000.0', 'sell_ceiling': 1000.0, 'sell_floor': 1000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1100.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1100.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1100.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1100.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
443	2023-09-28 16:03:29.971359	repository.product.product_price	updatePrice	\N	({'workmate': 1100.0, 'sell': 1100.0, 'sell_ceiling': 1100.0, 'sell_floor': 1100.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1000.0', 'sell_ceiling': 1000.0, 'sell_floor': 1000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1100.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1100.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1100.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1100.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
444	2023-09-28 16:03:29.985276	repository.financ.log_price_action	add	\N	({'product_price_id': 2, 'action': 'update', 'category_brand_price_action_id': 12, 'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 3, 'category_brand_price_action_id': 12, 'action': 'update', 'product_price_id': 2, 'created_at': '2023-09-28 16:03:29.982245', 'category_brand_price_action_obj': {'id': 12, 'category_id': 'موبایل', 'is_increase': True, 'percentage': 10.0, 'brand_id': 35, 'created_at': datetime.datetime(2023, 9, 28, 16, 3, 29, 866059), 'self_id': 0}, 'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0})	add
445	2023-09-28 16:05:08.494771	repository.product.product_price	updatePrice	\N	({'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1100.0', 'sell_ceiling': 1100.0, 'sell_floor': 1100.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1100.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1000.0', 'sell_ceiling': 1000.0, 'sell_floor': 1000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1000.0', 'sell_ceiling': 1000.0, 'sell_floor': 1000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
460	2023-09-28 18:10:23.269313	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 6, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:10:23.258811', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
461	2023-09-28 18:10:54.024719	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 7, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:10:54.015726', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
446	2023-09-28 16:06:17.690024	repository.product.product_price	updatePrice	\N	({'workmate': 1200.0, 'sell': 1200.0, 'sell_ceiling': 1200.0, 'sell_floor': 1200.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1000.0', 'sell_ceiling': 1000.0, 'sell_floor': 1000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1200.0', 'sell_ceiling': 1200.0, 'sell_floor': 1200.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1200.0', 'sell_ceiling': 1200.0, 'sell_floor': 1200.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
447	2023-09-28 16:06:17.704448	repository.financ.log_price_action	add	\N	({'product_price_id': 2, 'action': 'update', 'category_brand_price_action_id': 16, 'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 4, 'category_brand_price_action_id': 16, 'action': 'update', 'product_price_id': 2, 'created_at': '2023-09-28 16:06:17.701271', 'category_brand_price_action_obj': {'id': 16, 'category_id': 'موبایل', 'is_increase': True, 'percentage': 20.0, 'brand_id': 35, 'created_at': datetime.datetime(2023, 9, 28, 16, 6, 17, 574545), 'self_id': 0}, 'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0})	add
448	2023-09-28 16:06:37.071538	repository.product.product_price	updatePrice	\N	({'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1200.0', 'sell_ceiling': 1200.0, 'sell_floor': 1200.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1000.0', 'sell_ceiling': 1000.0, 'sell_floor': 1000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1000.0', 'sell_ceiling': 1000.0, 'sell_floor': 1000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
449	2023-09-28 16:06:37.097024	repository.financ.log_price_action	add	\N	({'product_price_id': 2, 'action': 'restore', 'category_brand_price_action_id': 17, 'workmate': '1200.0', 'sell': 1200.0, 'sell_ceiling': 1200.0, 'sell_floor': 1200.0},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 5, 'category_brand_price_action_id': 17, 'action': 'restore', 'product_price_id': 2, 'created_at': '2023-09-28 16:06:37.091558', 'category_brand_price_action_obj': {'id': 17, 'category_id': 'موبایل', 'is_increase': True, 'percentage': 20.0, 'brand_id': 35, 'created_at': datetime.datetime(2023, 9, 28, 16, 6, 36, 908983), 'self_id': 16}, 'workmate': 1200.0, 'sell': 1200.0, 'sell_ceiling': 1200.0, 'sell_floor': 1200.0})	add
450	2023-09-28 16:22:02.686394	repository.product.product_price	updatePrice	\N	({'workmate': 1200.0, 'sell': 1200.0, 'sell_ceiling': 1200.0, 'sell_floor': 1200.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1000.0', 'sell_ceiling': 1000.0, 'sell_floor': 1000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1200.0', 'sell_ceiling': 1200.0, 'sell_floor': 1200.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '1200.0', 'sell_ceiling': 1200.0, 'sell_floor': 1200.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
451	2023-09-28 16:22:02.69956	repository.financ.log_price_action	add	\N	({'product_price_id': 2, 'action': 'update', 'category_brand_price_action_id': 18, 'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 6, 'category_brand_price_action_id': 18, 'action': 'update', 'product_price_id': 2, 'created_at': '2023-09-28 16:22:02.696581', 'category_brand_price_action_obj': {'id': 18, 'category_id': 'موبایل', 'is_increase': True, 'percentage': 20.0, 'brand_id': 12, 'created_at': datetime.datetime(2023, 9, 28, 16, 22, 2, 572298), 'self_id': 0}, 'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0})	add
452	2023-09-28 16:23:51.259013	repository.product.product_price	updatePrice	\N	({'workmate': 2400.0, 'sell': 6000.0, 'sell_ceiling': 3600.0, 'sell_floor': 4800.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2000.0', 'sell_ceiling': 3000.0, 'sell_floor': 4000.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 5000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2400.0', 'sell_ceiling': 3600.0, 'sell_floor': 4800.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 6000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2400.0', 'sell_ceiling': 3600.0, 'sell_floor': 4800.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 6000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
453	2023-09-28 16:23:51.274049	repository.financ.log_price_action	add	\N	({'product_price_id': 2, 'action': 'update', 'category_brand_price_action_id': 20, 'workmate': 2000.0, 'sell': 5000.0, 'sell_ceiling': 3000.0, 'sell_floor': 4000.0},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 7, 'category_brand_price_action_id': 20, 'action': 'update', 'product_price_id': 2, 'created_at': '2023-09-28 16:23:51.270466', 'category_brand_price_action_obj': {'id': 20, 'category_id': 'موبایل', 'is_increase': True, 'percentage': 20.0, 'brand_id': 1, 'created_at': datetime.datetime(2023, 9, 28, 16, 23, 51, 101498), 'self_id': 0}, 'workmate': 2000.0, 'sell': 5000.0, 'sell_ceiling': 3000.0, 'sell_floor': 4000.0})	add
454	2023-09-28 16:24:04.108565	repository.product.product_price	updatePrice	\N	({'workmate': 2880.0, 'sell': 7200.0, 'sell_ceiling': 4320.0, 'sell_floor': 5760.0},)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2400.0', 'sell_ceiling': 3600.0, 'sell_floor': 4800.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 6000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}	update	system	(True, {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]})	main
455	2023-09-28 16:24:04.121793	repository.financ.log_price_action	add	\N	({'product_price_id': 2, 'action': 'update', 'category_brand_price_action_id': 21, 'workmate': 2400.0, 'sell': 6000.0, 'sell_ceiling': 3600.0, 'sell_floor': 4800.0},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 8, 'category_brand_price_action_id': 21, 'action': 'update', 'product_price_id': 2, 'created_at': '2023-09-28 16:24:04.118777', 'category_brand_price_action_obj': {'id': 21, 'category_id': 'موبایل', 'is_increase': True, 'percentage': 20.0, 'brand_id': 1, 'created_at': datetime.datetime(2023, 9, 28, 16, 24, 3, 938499), 'self_id': 0}, 'workmate': 2400.0, 'sell': 6000.0, 'sell_ceiling': 3600.0, 'sell_floor': 4800.0})	add
456	2023-09-28 17:38:26.576544	repository.warehouse.wastage	hard_delete	\N	('2',)	{'OPERATOR': 'my-key'}	{'id': 2, 'unit_id': 4, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': '', 'number': '0', 'description': 'null-record', 'created_at': '2023-09-18 17:21:13.718385', 'deleted_at': 'None', 'refrence_id': '1', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	{'id': 2, 'unit_id': 4, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': '', 'number': '0', 'description': 'null-record', 'created_at': '2023-09-18 17:21:13.718385', 'deleted_at': 'None', 'refrence_id': '1', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	delete	my-key	(True, '')	main
457	2023-09-28 17:38:45.598383	repository.warehouse.wastage	hard_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': '1', 'number': '3', 'description': 'توضیح انبار گردانی', 'created_at': '2023-08-12 15:12:06.754011', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	{'id': 1, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': '1', 'number': '3', 'description': 'توضیح انبار گردانی', 'created_at': '2023-08-12 15:12:06.754011', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	delete	my-key	(True, '')	main
463	2023-09-28 18:14:29.688587	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 8, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:14:29.679589', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
464	2023-09-28 18:14:59.429325	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 9, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:14:59.419926', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
465	2023-09-28 18:15:28.732949	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 10, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:15:28.719677', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
466	2023-09-28 18:16:08.69721	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 11, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:16:08.687890', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
467	2023-09-28 18:17:08.672815	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 12, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:17:08.664053', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
468	2023-09-28 18:18:01.339958	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 13, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:18:01.330419', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
469	2023-09-28 18:18:40.712193	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 14, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:18:40.702286', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
470	2023-09-28 18:19:06.056736	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 15, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:19:06.031096', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
471	2023-09-28 18:19:31.724481	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 16, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:19:31.712679', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
472	2023-09-28 18:20:12.21454	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 17, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:20:12.203587', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
473	2023-09-28 18:20:51.216191	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 18, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:20:51.197997', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
474	2023-09-28 18:21:15.250936	repository.warehouse.wastage	add	\N	({'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 19, 'unit_id': 1, 'warehouse_id': 2, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'created_at': '2023-09-28 18:21:15.242334', 'deleted_at': 'None', 'refrence_id': 'string', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}})	add
475	2023-09-30 10:27:04.194387	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': True, 'title': 'amin@gmail.com'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 16, 'title': 'amin@gmail.com', 'show_up': True, 'inserted_at': '2023-09-30 10:26:46.009185', 'deleted_at': 'None', 'language': 'Adiineeeeeeeee'})	add
476	2023-09-30 10:27:13.795059	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': True, 'title': 'amin@gmail.com'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
477	2023-09-30 10:29:43.27067	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
478	2023-09-30 10:33:07.262416	repository.feature.feature	add	\N	({'language': 'sadsad', 'show_up': True, 'title': 'sasasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 17, 'title': 'sasasa', 'show_up': True, 'inserted_at': '2023-09-30 10:32:47.943678', 'deleted_at': 'None', 'language': 'sadsad'})	add
479	2023-09-30 10:33:16.917694	repository.feature.feature	add	\N	({'language': 'assa', 'show_up': True, 'title': 'assasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 18, 'title': 'assasa', 'show_up': True, 'inserted_at': '2023-09-30 10:33:07.268133', 'deleted_at': 'None', 'language': 'assa'})	add
480	2023-09-30 10:33:16.923391	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
481	2023-09-30 10:33:58.132234	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
482	2023-09-30 10:35:39.807411	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': True, 'title': 'sasasasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 19, 'title': 'sasasasa', 'show_up': True, 'inserted_at': '2023-09-30 10:35:39.801411', 'deleted_at': 'None', 'language': 'Adiineeeeeeeee'})	add
483	2023-09-30 10:35:39.818775	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
484	2023-09-30 10:35:43.389954	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
485	2023-09-30 10:35:44.927495	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
486	2023-09-30 10:41:38.987665	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': False, 'title': 'Default Title'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 20, 'title': 'Default Title', 'show_up': False, 'inserted_at': '2023-09-30 10:41:38.982561', 'deleted_at': 'None', 'language': 'Adiineeeeeeeee'})	add
487	2023-09-30 10:41:38.992636	repository.feature.feature	add	\N	({'language': 'Default Language', 'show_up': False, 'title': 'Default Title'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
488	2023-09-30 10:41:56.234739	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
489	2023-09-30 10:42:56.402995	repository.feature.feature	add	\N	({'language': 'sasasa', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
490	2023-09-30 10:43:24.615329	repository.feature.feature	add	\N	({'language': 'sasasa', 'show_up': False, 'title': 'assasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
491	2023-09-30 10:43:28.482859	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
492	2023-09-30 10:43:30.170021	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
493	2023-09-30 10:43:35.752723	repository.feature.feature	add	\N	({'language': 'sasasa', 'show_up': True, 'title': 'sasa2121'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 21, 'title': 'sasa2121', 'show_up': True, 'inserted_at': '2023-09-30 10:43:35.748707', 'deleted_at': 'None', 'language': 'sasasa'})	add
497	2023-09-30 10:46:07.249971	repository.feature.feature	add	\N	({'language': 'wqwqwq', 'show_up': True, 'title': 'qwqwwqwq'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 23, 'title': 'qwqwwqwq', 'show_up': True, 'inserted_at': '2023-09-30 10:46:07.236622', 'deleted_at': 'None', 'language': 'wqwqwq'})	add
498	2023-09-30 10:46:07.254059	repository.feature.feature	add	\N	({'language': 'wqwqwq', 'show_up': True, 'title': 'qwqwwqwq'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
499	2023-09-30 10:46:42.018569	repository.feature.feature	add	\N	({'language': 'assasasa', 'show_up': True, 'title': 'saassasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 24, 'title': 'saassasa', 'show_up': True, 'inserted_at': '2023-09-30 10:46:42.003718', 'deleted_at': 'None', 'language': 'assasasa'})	add
500	2023-09-30 10:46:44.191835	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
543	2024-02-27 17:31:09.806912	repository.brand.brand	recovery	\N	('35',)	{'OPERATOR': 'my-key'}	{'id': 3, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 15:46:04.120269', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'true', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string', 'images': [], 'features': [], 'fileUses': ['string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}	{'id': 3, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 15:46:04.120269', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'true', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string', 'images': [], 'features': [], 'fileUses': ['string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}	recovery	my-key	True	main
544	2024-02-27 17:45:06.882593	repository.brand.brand	hard_delete	\N	('35',)	{'OPERATOR': 'my-key'}	{'id': 3, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 15:46:04.120269', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'true', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string', 'images': [], 'features': [], 'fileUses': ['string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}	{'id': 3, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 15:46:04.120269', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'true', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string', 'images': [], 'features': [], 'fileUses': ['string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}	delete	my-key	(False, 'بعد از گذشت چند روز می توانید دیتا را پاک کنید')	main
547	2024-03-02 16:14:57.59301	repository.brand.brand_image	add	\N	({'brand_id': 1, 'url': 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.facebook.com%2F1926341300773088%2Fposts%2F2451501754923704%2F%3Flocale%3Dar_AR&psig=AOvVaw26J7zOHAjonn-YkoiO2l0R&ust=1709469867598000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJD08tPN1YQDFQAAAAAdAAAAABAE', 'alt': 'الوچه'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 5, 'brand_id': 1, 'url': 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.facebook.com%2F1926341300773088%2Fposts%2F2451501754923704%2F%3Flocale%3Dar_AR&psig=AOvVaw26J7zOHAjonn-YkoiO2l0R&ust=1709469867598000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJD08tPN1YQDFQAAAAAdAAAAABAE', 'alt': 'الوچه', 'deleted_at': 'None', 'inserted_at': '2024-03-02 16:14:57.559593'})	add
548	2024-03-02 16:23:16.392591	repository.brand.brand_image	recovery	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:30:41.086505'}	recovery	my-key	True	main
549	2024-03-02 16:34:47.6173	repository.brand.brand_image	soft_delete	\N	('3',)	{'OPERATOR': 'my-key'}	{'id': 3, 'brand_id': 34, 'url': 'link', 'alt': 'my alt', 'deleted_at': 'None', 'inserted_at': '2023-08-31 11:32:41.370229'}	{'id': 3, 'brand_id': 34, 'url': 'link', 'alt': 'my alt', 'deleted_at': '2024-03-02 16:34:47.566602', 'inserted_at': '2023-08-31 11:32:41.370229'}	soft	my-key	(True, '')	main
550	2024-03-02 16:38:01.054207	repository.brand.brand_image	hard_delete	\N	('3',)	{'OPERATOR': 'my-key'}	{'id': 3, 'brand_id': 34, 'url': 'link', 'alt': 'my alt', 'deleted_at': '2024-03-02 16:34:47.566602', 'inserted_at': '2023-08-31 11:32:41.370229'}	{'id': 3, 'brand_id': 34, 'url': 'link', 'alt': 'my alt', 'deleted_at': '2024-03-02 16:34:47.566602', 'inserted_at': '2023-08-31 11:32:41.370229'}	delete	my-key	(False, 'بعد از گذشت چند روز می توانید دیتا را پاک کنید')	main
502	2023-09-30 11:00:06.856935	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': True, 'title': 'saasas@gmail'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 25, 'title': 'saasas@gmail', 'show_up': True, 'inserted_at': '2023-09-30 11:00:06.851233', 'deleted_at': 'None', 'language': 'Adiineeeeeeeee'})	add
503	2023-09-30 11:32:38.794617	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': True, 'title': 'asasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 26, 'title': 'asasa', 'show_up': True, 'inserted_at': '2023-09-30 11:32:38.764179', 'deleted_at': 'None', 'language': 'Adiineeeeeeeee'})	add
504	2023-09-30 11:49:24.951669	repository.feature.feature	add	\N	({'language': 'aaaaaaaaaaaaaa', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
505	2023-09-30 11:51:54.080558	repository.feature.feature	add	\N	({'language': 'aaaaaaaaaaaaaa', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
506	2023-09-30 11:52:02.53385	repository.feature.feature	add	\N	({'language': '', 'show_up': False, 'title': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
507	2023-09-30 11:52:36.168272	repository.feature.feature	add	\N	({'language': 'amirreza Aminian', 'show_up': True, 'title': '122112assasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 27, 'title': '122112assasa', 'show_up': True, 'inserted_at': '2023-09-30 11:52:09.388823', 'deleted_at': 'None', 'language': 'amirreza Aminian'})	add
508	2023-09-30 11:52:44.115235	repository.feature.feature	add	\N	({'language': 'assasa', 'show_up': True, 'title': 'assasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
509	2023-09-30 11:55:46.762976	repository.feature.feature	add	\N	({'language': 'asasa', 'show_up': True, 'title': 'sasasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
511	2023-09-30 12:42:18.466378	repository.feature.feature	add	\N	({'language': 'xzxzxz', 'show_up': True, 'title': 'zxxzxz'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 28, 'title': 'zxxzxz', 'show_up': True, 'inserted_at': '2023-09-30 12:42:03.900493', 'deleted_at': 'None', 'language': 'xzxzxz'})	add
512	2023-09-30 12:42:22.951087	repository.feature.feature	add	\N	({'language': 'xzxzxz', 'show_up': True, 'title': 'zxxzxz'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
513	2023-09-30 12:42:26.325469	repository.feature.feature	add	\N	({'language': 'xzxzxzxxxx', 'show_up': True, 'title': 'zxxzxz'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
514	2023-09-30 12:42:29.488886	repository.feature.feature	add	\N	({'language': 'xzxzxzxxxx', 'show_up': True, 'title': 'zxxzxzassa'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 29, 'title': 'zxxzxzassa', 'show_up': True, 'inserted_at': '2023-09-30 12:42:29.485171', 'deleted_at': 'None', 'language': 'xzxzxzxxxx'})	add
515	2023-09-30 12:44:39.579229	repository.feature.feature	add	\N	({'language': 'amirreza', 'show_up': True, 'title': 'aminian.amirreza@gmail.com'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 30, 'title': 'aminian.amirreza@gmail.com', 'show_up': True, 'inserted_at': '2023-09-30 12:44:05.555015', 'deleted_at': 'None', 'language': 'amirreza'})	add
516	2023-09-30 12:44:41.613235	repository.feature.feature	add	\N	({'language': 'amirreza', 'show_up': True, 'title': 'aminian.amirreza@gmail.com'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
517	2023-09-30 12:45:08.683311	repository.feature.feature	add	\N	({'language': 'Amirreza', 'show_up': True, 'title': 'a@gmail.com'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 31, 'title': 'a@gmail.com', 'show_up': True, 'inserted_at': '2023-09-30 12:44:55.584899', 'deleted_at': 'None', 'language': 'Amirreza'})	add
518	2023-09-30 12:45:08.692041	repository.feature.feature	add	\N	({'language': 'Amirreza', 'show_up': True, 'title': 'a@gmail.com'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
519	2023-09-30 12:46:17.080205	repository.feature.feature	add	\N	({'language': 'assaas', 'show_up': True, 'title': 'assasa'},)	{'OPERATOR': 'my-key'}			add	my-key	(False, 'این تایتل قبلا ثبت شده است.')	add
520	2023-09-30 12:47:07.787267	repository.feature.feature	add	\N	({'language': 'Amirreza', 'show_up': True, 'title': 'mm'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 32, 'title': 'mm', 'show_up': True, 'inserted_at': '2023-09-30 12:46:53.910258', 'deleted_at': 'None', 'language': 'Amirreza'})	add
521	2023-09-30 12:50:42.152631	repository.feature.feature	add	\N	({'language': 'Adiineeeeeeeee', 'show_up': True, 'title': 'ssss'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 33, 'title': 'ssss', 'show_up': True, 'inserted_at': '2023-09-30 12:47:07.795136', 'deleted_at': 'None', 'language': 'Adiineeeeeeeee'})	add
522	2023-09-30 13:29:06.268455	repository.warehouse.warehouse	add	\N	({'title': 'انبار شماره 3', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'is_active': True},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'title': 'انبار شماره 3', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-09-30 12:50:42.158543', 'deleted_at': 'None', 'is_active': True, 'managers': [], 'phones': []})	add
523	2023-09-30 14:04:11.522904	repository.warehouse.transfer	add	\N	({'products': [{'product_id': 1, 'unit_id': 0, 'number': 5, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 2, 'warehouse_manager_origin_id': 'string', 'title': 'string', 'warehouse_goal_id': 3, 'warehouse_manager_goal_id': 'string', 'submit_at': 'now()', 'receive_at': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'warehouse_origin_id': '2', 'warehouse_manager_origin_id': 'string', 'code': 'vUHkkyzToo', 'title': 'string', 'warehouse_goal_id': '3', 'warehouse_manager_goal_id': 'string', 'created_at': '2023-09-30 14:04:11.322212', 'submit_at': '2023-09-30 14:04:11.322212', 'receive_at': 'None', 'deleted_at': 'None', 'products': (True, [], 0)})	add
551	2024-03-02 16:48:00.972709	repository.brand.brand_image	soft_delete	\N	('1',)	{'OPERATOR': 'my-key'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:30:41.086505'}	{'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2024-03-02 16:38:23.045827', 'inserted_at': '2023-07-22 10:30:41.086505'}	soft	my-key	(True, '')	main
524	2023-09-30 14:11:41.19797	repository.warehouse.transfer	add	\N	({'products': [{'product_id': 1, 'unit_id': 0, 'number': 5, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 2, 'warehouse_manager_origin_id': 'string', 'title': 'string', 'warehouse_goal_id': 3, 'warehouse_manager_goal_id': 'string', 'submit_at': 'now()', 'receive_at': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'warehouse_origin_id': '2', 'warehouse_manager_origin_id': 'string', 'code': '1U7TeWXPzN', 'title': 'string', 'warehouse_goal_id': '3', 'warehouse_manager_goal_id': 'string', 'created_at': '2023-09-30 14:11:40.752170', 'submit_at': '2023-09-30 14:11:40.752170', 'receive_at': 'None', 'deleted_at': 'None', 'products': (True, [], 0)})	add
525	2023-09-30 14:16:46.842972	repository.warehouse.transfer	add	\N	({'products': [{'product_id': 1, 'unit_id': 0, 'number': 5, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 2, 'warehouse_manager_origin_id': 'string', 'title': 'string', 'warehouse_goal_id': 3, 'warehouse_manager_goal_id': 'string', 'submit_at': 'now()', 'receive_at': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 4, 'warehouse_origin_id': '2', 'warehouse_manager_origin_id': 'string', 'code': 'yuxoceiYxo', 'title': 'string', 'warehouse_goal_id': '3', 'warehouse_manager_goal_id': 'string', 'created_at': '2023-09-30 14:16:46.671354', 'submit_at': '2023-09-30 14:16:46.671354', 'receive_at': 'None', 'deleted_at': 'None', 'products': (True, [], 0)})	add
526	2023-09-30 14:17:44.073375	repository.warehouse.transfer	add	\N	({'products': [{'product_id': 1, 'unit_id': 0, 'number': 5, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 2, 'warehouse_manager_origin_id': 'string', 'title': 'string', 'warehouse_goal_id': 3, 'warehouse_manager_goal_id': 'string', 'submit_at': 'now()', 'receive_at': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 5, 'warehouse_origin_id': '2', 'warehouse_manager_origin_id': 'string', 'code': '5JpI9qdTVd', 'title': 'string', 'warehouse_goal_id': '3', 'warehouse_manager_goal_id': 'string', 'created_at': '2023-09-30 14:17:43.594065', 'submit_at': '2023-09-30 14:17:43.594065', 'receive_at': 'None', 'deleted_at': 'None', 'products': (True, [], 0)})	add
527	2023-09-30 14:18:59.98007	repository.warehouse.transfer	add	\N	({'products': [{'product_id': 1, 'unit_id': 1, 'number': 5, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 2, 'warehouse_manager_origin_id': 'string', 'title': 'string', 'warehouse_goal_id': 3, 'warehouse_manager_goal_id': 'string', 'submit_at': 'now()', 'receive_at': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 6, 'warehouse_origin_id': '2', 'warehouse_manager_origin_id': 'string', 'code': 'Xiiday6QIu', 'title': 'string', 'warehouse_goal_id': '3', 'warehouse_manager_goal_id': 'string', 'created_at': '2023-09-30 14:18:59.610363', 'submit_at': '2023-09-30 14:18:59.610363', 'receive_at': 'None', 'deleted_at': 'None', 'products': (True, [], 0)})	add
528	2023-09-30 14:20:30.680251	repository.warehouse.transfer	add	\N	({'products': [{'product_id': 1, 'unit_id': 1, 'number': 5, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 2, 'warehouse_manager_origin_id': 'string', 'title': 'string', 'warehouse_goal_id': 3, 'warehouse_manager_goal_id': 'string', 'submit_at': 'now()', 'receive_at': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 7, 'warehouse_origin_id': '2', 'warehouse_manager_origin_id': 'string', 'code': '1qltNO1YD9', 'title': 'string', 'warehouse_goal_id': '3', 'warehouse_manager_goal_id': 'string', 'created_at': '2023-09-30 14:20:30.511721', 'submit_at': '2023-09-30 14:20:30.511721', 'receive_at': 'None', 'deleted_at': 'None', 'products': (True, [], 0)})	add
529	2023-09-30 15:13:47.550729	repository.warehouse.transfer	add	\N	({'products': [{'product_id': 1, 'unit_id': 1, 'number': 1, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 3, 'warehouse_manager_origin_id': 'string', 'title': 'string', 'warehouse_goal_id': 2, 'warehouse_manager_goal_id': 'string', 'submit_at': 'now()', 'receive_at': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 8, 'warehouse_origin_id': '3', 'warehouse_manager_origin_id': 'string', 'code': '86eP4vddsN', 'title': 'string', 'warehouse_goal_id': '2', 'warehouse_manager_goal_id': 'string', 'created_at': '2023-09-30 15:13:47.483588', 'submit_at': '2023-09-30 15:13:47.483588', 'receive_at': 'None', 'deleted_at': 'None', 'products': (True, [], 0)})	add
530	2023-09-30 15:20:21.722599	repository.warehouse.transfer	add	\N	({'products': [{'product_id': 1, 'unit_id': 1, 'number': 2, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 2, 'warehouse_manager_origin_id': 'string', 'title': 'string', 'warehouse_goal_id': 3, 'warehouse_manager_goal_id': 'string', 'submit_at': 'now()', 'receive_at': ''},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 9, 'warehouse_origin_id': '2', 'warehouse_manager_origin_id': 'string', 'code': 'RCaV4T4A0i', 'title': 'string', 'warehouse_goal_id': '3', 'warehouse_manager_goal_id': 'string', 'created_at': '2023-09-30 15:20:21.534181', 'submit_at': '2023-09-30 15:20:21.534181', 'receive_at': 'None', 'deleted_at': 'None', 'products': []})	add
531	2023-10-01 15:19:13.037869	repository.warehouse.stock_taking	add	\N	({'products': [{'counting_one': 9, 'counting_second': 10, 'counting_third': 12, 'counting_final': 10, 'description': 'string', 'refrence_id': 0, 'product_id': 1, 'unit_id': 1}], 'warehouse_id': 2, 'warehouse_manager_id': 'string', 'description': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 2, 'warehouse_id': 2, 'warehouse_manager_id': 'string', 'code': 'SyTwX7lpxD', 'description': 'string', 'created_at': '2023-10-01 15:19:13.020246', 'deleted_at': 'None', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}, 'prdocuts': (True, [], 0)})	add
532	2023-10-01 15:25:44.920775	repository.warehouse.stock_taking	add	\N	({'products': [{'counting_one': 10, 'counting_second': 11, 'counting_third': 11, 'counting_final': 10, 'description': 'string', 'refrence_id': 1, 'product_id': 0, 'unit_id': 0}], 'warehouse_id': 2, 'warehouse_manager_id': 'string', 'description': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'warehouse_id': 2, 'warehouse_manager_id': 'string', 'code': 'NFlnbkJSXO', 'description': 'string', 'created_at': '2023-10-01 15:25:44.909778', 'deleted_at': 'None', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}, 'prdocuts': (True, [], 0)})	add
552	2024-03-02 16:58:05.794534	repository.brand.brand_feature	add	\N	({'brand_id': 1, 'feature_id': 1, 'sort_id_feature': 1, 'feature_value_id': 1, 'sort_id_feature_value': 1},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 3, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}})	add
533	2023-10-01 15:27:48.55553	repository.warehouse.stock_taking	add	\N	({'products': [{'counting_one': 10, 'counting_second': 11, 'counting_third': 11, 'counting_final': 10, 'description': 'string', 'refrence_id': 1, 'product_id': 0, 'unit_id': 0}], 'warehouse_id': 2, 'warehouse_manager_id': 'string', 'description': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 4, 'warehouse_id': 2, 'warehouse_manager_id': 'string', 'code': 'lRuCSXo6s1', 'description': 'string', 'created_at': '2023-10-01 15:27:48.540383', 'deleted_at': 'None', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}, 'prdocuts': (True, [], 0)})	add
534	2023-10-01 15:28:33.55015	repository.warehouse.stock_taking	add	\N	({'products': [{'counting_one': 10, 'counting_second': 11, 'counting_third': 11, 'counting_final': 10, 'description': 'string', 'refrence_id': 1, 'product_id': 0, 'unit_id': 0}], 'warehouse_id': 2, 'warehouse_manager_id': 'string', 'description': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 5, 'warehouse_id': 2, 'warehouse_manager_id': 'string', 'code': 'Uixev0SxYc', 'description': 'string', 'created_at': '2023-10-01 15:28:33.528467', 'deleted_at': 'None', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}, 'prdocuts': (True, [], 0)})	add
535	2023-10-01 15:30:17.670069	repository.warehouse.stock_taking	add	\N	({'products': [{'counting_one': 10, 'counting_second': 11, 'counting_third': 11, 'counting_final': 10, 'description': 'string', 'refrence_id': 1, 'product_id': 0, 'unit_id': 0}], 'warehouse_id': 2, 'warehouse_manager_id': '1', 'description': 'string'},)	{'OPERATOR': 'my-key'}			add	my-key	(True, {'id': 6, 'warehouse_id': 2, 'warehouse_manager_id': '1', 'code': 'WMRnQjBXs0', 'description': 'string', 'created_at': '2023-10-01 15:30:17.654041', 'deleted_at': 'None', 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}, 'prdocuts': (True, [], 0)})	add
536	2023-10-05 14:14:38.798516	repository.product.basket	update_status	\N	('',)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'product_price_id': 2, 'warehouse_id': 2, 'user_id': 'string', 'type_user_id': 'string', 'inserted_at': '2023-10-02 13:14:46.401077', 'number': 2, 'per_price': 7200.0, 'send_by': 'string', 'next_buy': False, 'order_status': None, 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': '1', 'model': 'string', 'title': 'پفک', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'product_feature_values_obj': [{'id': 1, 'product_id': 1, 'feature_id': {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'}, 'refrence_id': 'string', 'feature_value_obj': {'id': 5, 'value': '2 ترابایت', 'language': None}}], 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'price': [{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}]}, 'product_price_obj': {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}, 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	{'id': 2, 'product_id': 1, 'product_price_id': 2, 'warehouse_id': 2, 'user_id': 'string', 'type_user_id': 'string', 'inserted_at': '2023-10-02 13:14:46.401077', 'number': 2, 'per_price': 7200.0, 'send_by': 'string', 'next_buy': False, 'order_status': '', 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': '1', 'model': 'string', 'title': 'پفک', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'product_feature_values_obj': [{'id': 1, 'product_id': 1, 'feature_id': {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'}, 'refrence_id': 'string', 'feature_value_obj': {'id': 5, 'value': '2 ترابایت', 'language': None}}], 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'price': [{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}]}, 'product_price_obj': {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}, 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	update	system	True	main
537	2023-10-05 14:19:36.945886	repository.product.basket	update_status	\N	('',)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'product_price_id': 2, 'warehouse_id': 2, 'user_id': 'string', 'type_user_id': 'string', 'inserted_at': '2023-10-02 13:14:46.401077', 'number': 2, 'per_price': 7200.0, 'send_by': 'string', 'next_buy': False, 'order_status': None, 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': '1', 'model': 'string', 'title': 'پفک', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'product_feature_values_obj': [{'id': 1, 'product_id': 1, 'feature_id': {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'}, 'refrence_id': 'string', 'feature_value_obj': {'id': 5, 'value': '2 ترابایت', 'language': None}}], 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'price': [{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}]}, 'product_price_obj': {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}, 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	{'id': 2, 'product_id': 1, 'product_price_id': 2, 'warehouse_id': 2, 'user_id': 'string', 'type_user_id': 'string', 'inserted_at': '2023-10-02 13:14:46.401077', 'number': 2, 'per_price': 7200.0, 'send_by': 'string', 'next_buy': False, 'order_status': '', 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': '1', 'model': 'string', 'title': 'پفک', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'product_feature_values_obj': [{'id': 1, 'product_id': 1, 'feature_id': {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'}, 'refrence_id': 'string', 'feature_value_obj': {'id': 5, 'value': '2 ترابایت', 'language': None}}], 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'price': [{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}]}, 'product_price_obj': {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 7200.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}, 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	update	system	True	main
538	2023-10-15 10:29:23.411897	repository.product.basket	update_status	\N	('paying',)	{'id': 2, 'OPERATOR': 'system'}	{'id': 2, 'product_id': 1, 'product_price_id': 2, 'warehouse_id': 2, 'user_id': 'string', 'type_user_id': 'string', 'inserted_at': '2023-10-02 13:14:46.401077', 'number': 2, 'per_price': 1000.0, 'send_by': 'string', 'next_buy': False, 'order_status': None, 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': '1', 'model': 'string', 'title': 'پفک', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'product_feature_values_obj': [{'id': 1, 'product_id': 1, 'feature_id': {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'}, 'refrence_id': 'string', 'feature_value_obj': {'id': 5, 'value': '2 ترابایت', 'language': None}}], 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'price': [{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}]}, 'product_price_obj': {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}, 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	{'id': 2, 'product_id': 1, 'product_price_id': 2, 'warehouse_id': 2, 'user_id': 'string', 'type_user_id': 'string', 'inserted_at': '2023-10-02 13:14:46.401077', 'number': 2, 'per_price': 1000.0, 'send_by': 'string', 'next_buy': False, 'order_status': 'paying', 'product_obj': {'id': 1, 'brand_id': 1, 'unit_id': 1, 'category': '1', 'model': 'string', 'title': 'پفک', 'point': 'string', 'weight': 'string', 'weight_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'width': 'string', 'width_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'height': 'string', 'height_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'depth': 'string', 'depth_unit': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'title_en': 'string', 'status': 'string', 'code': 'string', 'inserted_at': '2023-07-26 13:27:55.450788', 'deleted_at': 'None', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo ': 'string', 'publishDate': '2023-07-24 14:55:08.668891', 'product_feature_values_obj': [{'id': 1, 'product_id': 1, 'feature_id': {'id': 3, 'title': 'ظرفیت حافظه داخلی', 'show_up': True, 'inserted_at': '2023-07-22 11:28:13.201970', 'deleted_at': 'None', 'language': 'string'}, 'refrence_id': 'string', 'feature_value_obj': {'id': 5, 'value': '2 ترابایت', 'language': None}}], 'isDraft': None, 'brand_obj': {'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}, 'unit_obj': {'id': 1, 'title': 'کیلوگرم', 'language': None}, 'price': [{'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}]}, 'product_price_obj': {'id': 2, 'product_id': 1, 'order_id': 10, 'unit_id': 1, 'buy': 1000.0, 'workmate': '2880.0', 'sell_ceiling': 4320.0, 'sell_floor': 5760.0, 'sell_ai': 0.0, 'percentage_ceiling': 20.0, 'percentage_floor': 10.0, 'percentage_ai': 0.0, 'balance': 8.0, 'sell': 1000.0, 'is_active': True, 'inserted_at': '2023-09-25 17:19:27.967101', 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'feature_values': [{'id': 1, 'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2, 'feature_obj': {'id': 2, 'title': 'سری پردازنده', 'show_up': True, 'inserted_at': '2023-07-22 11:28:06.866318', 'deleted_at': 'None', 'language': 'string'}, 'feature_value_obj': {'id': 1, 'value': 'یک ترابایت', 'language': None}}]}, 'warehouse_obj': {'id': 2, 'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'inserted_at': '2023-08-12 11:16:48.340229', 'deleted_at': 'None', 'is_active': True, 'managers': [{'id': 2, 'warehouse_id': 2, 'manager_id': 'string'}], 'phones': []}}	update	system	True	main
539	2023-10-15 11:52:49.564296	repository.financ.order	update_order_status	\N	({'account_id': '1', 'peyment_status': 'پرداخت شده', 'transaction_at': 'now()'},)	{'id': '13', 'OPERATOR': 'system'}	{'id': 13, 'account_id': 4, 'transaction_at': '2023-10-15 10:29:23.512498', 'due_date': '2023-10-15 10:29:23.512498', 'user_id': 'string', 'factor_code': '', 'factor_image': '', 'title': 'ثبت فاکتور خرید string ', 'finall_transportation': '0', 'finall_price': 2000, 'finall_gain': 0, 'finall_tax': 0, 'general_gain': 0, 'total_price': 0, 'orders_status': 'ارسال نشده', 'peyment_status': 'پرداخت نشده', 'type': 'فروش', 'payment_type': 'پرداخت آنلاین', 'orders_code': 'none', 'number': '0', 'created_at': '2023-10-15 10:29:23.512498', 'code': '5sXEnw9fx8', 'is_increase_financial_balance': True, 'type_id': '2', 'deleted_at': 'None', 'send_status': 'ارسال نشده', 'is_close': None, 'account_obj': {'id': 4, 'account_number': 'null-record', 'card_number': 'null-record', 'shaba_number': 'null-record', 'bank': 'null-record', 'type': 'null-record', 'title': 'null-record', 'is_actvie': False, 'created_at': '2023-09-28 18:19:33.382836', 'deleted_at': 'None'}, 'order_type_obj': (True, [{'id': 6, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2}], 1), 'products': []}	{'id': 13, 'account_id': 1, 'transaction_at': '2023-10-15 11:52:49.543307', 'due_date': '2023-10-15 10:29:23.512498', 'user_id': 'string', 'factor_code': '', 'factor_image': '', 'title': 'ثبت فاکتور خرید string ', 'finall_transportation': '0', 'finall_price': 2000, 'finall_gain': 0, 'finall_tax': 0, 'general_gain': 0, 'total_price': 0, 'orders_status': 'ارسال نشده', 'peyment_status': 'پرداخت شده', 'type': 'فروش', 'payment_type': 'پرداخت آنلاین', 'orders_code': 'none', 'number': '0', 'created_at': '2023-10-15 10:29:23.512498', 'code': '5sXEnw9fx8', 'is_increase_financial_balance': True, 'type_id': '2', 'deleted_at': 'None', 'send_status': 'ارسال نشده', 'is_close': None, 'account_obj': [], 'order_type_obj': (True, [{'id': 6, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2}], 1), 'products': []}	update	system	(True, {'id': 13, 'account_id': 1, 'transaction_at': '2023-10-15 11:52:49.543307', 'due_date': '2023-10-15 10:29:23.512498', 'user_id': 'string', 'factor_code': '', 'factor_image': '', 'title': 'ثبت فاکتور خرید string ', 'finall_transportation': '0', 'finall_price': 2000, 'finall_gain': 0, 'finall_tax': 0, 'general_gain': 0, 'total_price': 0, 'orders_status': 'ارسال نشده', 'peyment_status': 'پرداخت شده', 'type': 'فروش', 'payment_type': 'پرداخت آنلاین', 'orders_code': 'none', 'number': '0', 'created_at': '2023-10-15 10:29:23.512498', 'code': '5sXEnw9fx8', 'is_increase_financial_balance': True, 'type_id': '2', 'deleted_at': 'None', 'send_status': 'ارسال نشده', 'is_close': None, 'account_obj': [], 'order_type_obj': (True, [{'id': 6, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2}], 1), 'products': []})	main
540	2023-10-15 12:02:44.397907	repository.financ.wallet	add	\N	({'user_id': 'string', 'amount': 0, 'is_increase': False, 'type_id': 4, 'table_name': 'null-record', 'table_id': '', 'is_real': False, 'gift_reminder': '', 'order_id': 13, 'transaction_id': 0},)	{'OPERATOR': 'system'}			add	system	(True, {'id': 1, 'order_id': 13, 'transaction_id': 0, 'user_id': 'string', 'amount': '0', 'is_increase': False, 'type_id': '4', 'table_name': 'null-record', 'table_id': '', 'created_at': '2023-10-15 12:02:44.381095', 'deleted_at': 'None', 'is_real': 'false', 'gift_reminder': '', 'order_obj': {'id': 13, 'account_id': 1, 'transaction_at': '2023-10-15 11:52:49.543307', 'due_date': '2023-10-15 10:29:23.512498', 'user_id': 'string', 'factor_code': '', 'factor_image': '', 'title': 'ثبت فاکتور خرید string ', 'finall_transportation': '0', 'finall_price': 2000, 'finall_gain': 0, 'finall_tax': 0, 'general_gain': 0, 'total_price': 0, 'orders_status': 'ارسال نشده', 'peyment_status': 'پرداخت شده', 'type': 'فروش', 'payment_type': 'پرداخت آنلاین', 'orders_code': 'none', 'number': '0', 'created_at': '2023-10-15 10:29:23.512498', 'code': '5sXEnw9fx8', 'is_increase_financial_balance': True, 'type_id': '2', 'deleted_at': 'None', 'send_status': 'ارسال نشده', 'is_close': None, 'account_obj': [], 'order_type_obj': (True, [{'id': 6, 'type_name': 'فروش', 'increase_balance': False, 'increase_financial_balance': True, 'description': 'فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود', 'type_id': 2}], 1), 'products': []}, 'transaction_obj': []})	add
545	2024-02-28 16:22:06.54523	repository.brand.brand	recovery	\N	('15',)	{'OPERATOR': 'my-key'}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}	{'id': 1, 'title': 'نایک', 'title_en': 'nike', 'logo': 'alt', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 08:38:50.666549', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': '123', 'images': [{'id': 2, 'brand_id': 1, 'url': 'testutl', 'alt': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-22 10:31:49.568158'}, {'id': 1, 'brand_id': 1, 'url': 'url', 'alt': 'alt', 'deleted_at': '2023-07-22 10:32:34.208710', 'inserted_at': '2023-07-22 10:30:41.086505'}], 'features': [{'id': 2, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '5', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 5, 'value': '2 ترابایت', 'language': None}}, {'id': 1, 'brand_id': 1, 'feature_id': 1, 'sort_id_feature': '1', 'feature_value_id': '1', 'sort_id_feature_value': '1', 'feature_obj': {'id': 1, 'title': 'سایز', 'show_up': True, 'inserted_at': '2023-07-22 11:27:27.164078', 'deleted_at': 'None', 'language': 'string'}, 'feature_value': {'id': 1, 'value': 'یک ترابایت', 'language': None}}], 'fileUses': ['testutl', 'url', 'string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}	recovery	my-key	True	main
546	2024-02-28 16:38:42.869727	repository.brand.brand	recovery	\N	('35',)	{'OPERATOR': 'my-key'}	{'id': 3, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 15:46:04.120269', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'true', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string', 'images': [], 'features': [], 'fileUses': ['string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}	{'id': 3, 'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'deleted_at': 'None', 'inserted_at': '2023-07-20 15:46:04.120269', 'percentage_floor': 0.0, 'percentage_ceiling': 0.0, 'publishDate': '2023-07-20 08:37:37', 'isDraft': 'true', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string', 'images': [], 'features': [], 'fileUses': ['string'], 'is_seo_url_ok': None, 'seo_url_last_response': None}	recovery	my-key	True	main
\.


--
-- Data for Name: discount_calander; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.discount_calander (id, name, start_date, end_date, landing_page_url, num_user_can_buy, num_product_salse, num_product, minimum_basket_price, maximum_apply_discount, is_finished, is_actice, inserted_at, deleted_at, num_total_use, num_per_session, prevent_losses) FROM stdin;
\.


--
-- Data for Name: discount_calander_banner; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.discount_calander_banner (id, discount_calander_id, url, alt, page_refer) FROM stdin;
\.


--
-- Data for Name: discount_calander_list; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.discount_calander_list (id, discount_calander_id, discount_price, discount_precentage, percentage_up, percentage_down, price_up, price_down, wich_one) FROM stdin;
\.


--
-- Data for Name: discount_calander_list_banner_category; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.discount_calander_list_banner_category (id, discount_calander_list_id, brand_id, category_id) FROM stdin;
\.


--
-- Data for Name: discount_calander_list_codes; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.discount_calander_list_codes (id, discount_calander_list_id, code) FROM stdin;
\.


--
-- Data for Name: discount_calander_msg; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.discount_calander_msg (id, discount_calander_id, name, send_date, text) FROM stdin;
\.


--
-- Data for Name: discount_calander_msg_media; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.discount_calander_msg_media (id, discount_calander_msg_id, url, type) FROM stdin;
\.


--
-- Data for Name: discount_calander_msg_reciever; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.discount_calander_msg_reciever (id, discount_calander_msg_id, reciever) FROM stdin;
\.


--
-- Data for Name: error_log; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.error_log (id, created_at, class_name, func_name, error, arg, kwargs, count, last_record) FROM stdin;
1	2023-07-20 10:20:48.49889	repository.controller.decorators	recovery	'str' object has no attribute 'set'	('1',)	{'OPERATOR': 'my-key'}	0	2023-07-20 10:20:48.49889+03:30
2	2023-07-20 10:22:15.69583	repository.controller.decorators	get_one	'str' object has no attribute 'set'	('1',)	{'is_update_cache': True}	0	2023-07-20 10:22:15.69583+03:30
3	2023-07-20 10:22:15.701171	repository.controller.decorators	recovery		('1',)	{'OPERATOR': 'my-key'}	0	2023-07-20 10:22:15.701171+03:30
4	2023-07-20 10:22:26.676231	repository.controller.decorators	get_one	'str' object has no attribute 'set'	('1',)	{'is_update_cache': True}	0	2023-07-20 10:22:26.676231+03:30
5	2023-07-20 10:22:26.681274	repository.controller.decorators	recovery		('1',)	{'OPERATOR': 'my-key'}	0	2023-07-20 10:22:26.681274+03:30
6	2023-07-20 10:22:38.309697	repository.controller.decorators	get_one	'str' object has no attribute 'set'	('1',)	{'is_update_cache': True}	0	2023-07-20 10:22:38.309697+03:30
7	2023-07-20 10:22:38.317713	repository.controller.decorators	recovery		('1',)	{'OPERATOR': 'my-key'}	0	2023-07-20 10:22:38.317713+03:30
8	2023-07-20 10:22:55.877361	repository.controller.decorators	recovery	'str' object has no attribute 'set'	('1',)	{'OPERATOR': 'my-key'}	0	2023-07-20 10:22:55.877361+03:30
9	2023-07-20 10:26:33.825948	repository.controller.decorators	recovery	'str' object has no attribute 'set'	('1',)	{'OPERATOR': 'my-key'}	0	2023-07-20 10:26:33.825948+03:30
10	2023-07-20 10:30:18.223639	repository.controller.decorators	recovery	'str' object has no attribute 'set'	('1',)	{'OPERATOR': 'my-key'}	0	2023-07-20 10:30:18.223639+03:30
11	2023-07-20 13:22:51.301788	repository.controller.decorators	add	name 'random' is not defined	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishdate': 'string', 'isdraft': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': ''},)	{'OPERATOR': 'my-key'}	0	2023-07-20 13:22:51.301788+03:30
12	2023-07-20 15:43:22.147627	repository.controller.decorators	add	name 'data' is not defined	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'url': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishdate': 'string', 'isdraft': 'string', 'language': 'string', 'viewmode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-07-20 15:43:22.147627+03:30
13	2023-07-22 13:14:14.351783	repository.controller.decorators	add	tuple index out of range	({'brand_id': 1, 'feature_id': 1, 'sort_id_feature': 1, 'feature_value_id': 1, 'sort_id_feature_value': 1},)	{'OPERATOR': 'my-key'}	0	2023-07-22 13:14:14.351783+03:30
14	2023-07-25 17:03:18.489076	repository.controller.decorators	add	column "feature_value_sort_id" of relation "feature_values_category" does not exist\nLINE 7:             feature_value_sort_id\n                    ^\n	({'feature_value_id': 1, 'feature_id': 1, 'category_id': 'string', 'is_filter': True, 'feature_sort_id': 1, 'language': 'string', 'feature_value_sort_id': 1},)	{'OPERATOR': 'my-key'}	0	2023-07-25 17:03:18.489076+03:30
15	2023-07-25 17:11:01.803851	repository.controller.decorators	add	tuple index out of range	({'title': 'کیلوگرم'},)	{'OPERATOR': 'my-key'}	0	2023-07-25 17:11:01.803851+03:30
16	2023-07-26 13:15:39.093236	repository.controller.decorators	add	'seo '	({'brand_id': 1, 'unit_id': 1, 'category': 'string', 'unit': 'string', 'model': 'string', 'title': 'string', 'point': 'string', 'weight': 'string', 'weight_unit': 'string', 'width': 'string', 'width_unit': 'string', 'height': 'string', 'height_unit': 'string', 'depth': 'string', 'depth_unit': 'string', 'title_en': 'string', 'status': 'string', 'code': 'string', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'publishDate': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-07-26 13:15:39.093236+03:30
17	2023-07-26 13:40:33.265921	repository.controller.decorators	add	tuple index out of range	({'title': 'کیفیت و کارایی'},)	{'OPERATOR': 'my-key'}	0	2023-07-26 13:40:33.265921+03:30
18	2023-07-26 14:53:43.868797	repository.controller.decorators	add	insert or update on table "product_rate" violates foreign key constraint "product_rate_rate_id_fkey"\nDETAIL:  Key (rate_id)=(56) is not present in table "rate".\n	({'product_id': 1, 'rate_id': 56, 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-07-26 14:53:43.868797+03:30
19	2023-07-29 13:55:28.716096	repository.controller.decorators	add	tuple index out of range	({'product_id': 1, 'title': 'مقاله 1', 'text': 'string', 'user_id': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-07-29 13:55:28.716096+03:30
20	2023-08-08 15:18:52.796794	repository.schedule.task_queue	search	search() missing 1 required positional argument: 'args'	()	{}	0	2023-08-08 15:18:52.796794+03:30
21	2023-08-08 15:19:04.538034	repository.schedule.task_queue	search	search() missing 1 required positional argument: 'args'	()	{}	0	2023-08-08 15:19:04.538034+03:30
22	2023-08-08 15:20:28.979085	repository.schedule.task_queue	search	search() missing 1 required positional argument: 'args'	()	{}	0	2023-08-08 15:20:28.979085+03:30
23	2023-08-08 15:20:40.159564	repository.schedule.task_queue	search	search() missing 1 required positional argument: 'args'	()	{}	0	2023-08-08 15:20:40.159564+03:30
24	2023-08-12 11:14:59.305217	repository.controller.decorators	add	tuple index out of range	({'title': 'انبار شماره 1', 'height': 'string', 'dimension': 'string', 'address': 'string', 'postal_code': 'string', 'x_location': 'string', 'y_location': 'string', 'is_active': True},)	{'OPERATOR': 'my-key'}	0	2023-08-12 11:14:59.305217+03:30
25	2023-08-12 11:34:56.093365	repository.controller.decorators	add	tuple index out of range	({'warehouse_id': 1, 'manager_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-08-12 11:34:56.093365+03:30
26	2023-08-12 11:35:29.897004	repository.controller.decorators	add	syntax error at or near ")"\nLINE 5:          )\n                 ^\n	({'warehouse_id': 1, 'manager_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-08-12 11:35:29.897004+03:30
27	2023-08-12 11:35:42.173644	repository.controller.decorators	add	syntax error at or near ")"\nLINE 5:          )\n                 ^\n	({'warehouse_id': 1, 'manager_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-08-12 11:35:42.173644+03:30
28	2023-08-14 16:54:25.371702	repository.controller.decorators	add	syntax error at or near "order"\nLINE 2:       insert into order\n                          ^\n	({'account_id': 0, 'due_date': '2023-08-14 16:52:50', 'user_id': 'string', 'factor_code': 'string', 'factor_image': 'string', 'title': 'string', 'finall_transportation': 0, 'finall_price': 0, 'finall_gain': 0, 'finall_tax': 0, 'general_gain': 0, 'total_price': 0, 'orders_status': 'string', 'peyment_status': 'string', 'type': 'string', 'payment_type': 'string', 'orders_code': 'string', 'number': 'string', 'code': 'string', 'is_increase_financial_balance': True, 'type_id': 'string', 'send_status': 'string', 'transaction_at': '2023-08-14 16:52:50'},)	{'OPERATOR': 'my-key'}	0	2023-08-14 16:54:25.371702+03:30
29	2023-08-15 13:01:49.159876	repository.controller.decorators	add	'receive_at'	({'order_id': 1, 'warehouse_id': 1, 'warehouse_manager_id': 'string', 'title': 'string', 'code': 'string', 'description': 'string', 'type': 'string', 'type_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-08-15 13:01:49.159876+03:30
30	2023-08-31 10:40:58.460939	repository.brand.brand	draft	draft() missing 1 required positional argument: 'id'	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-24 15:29:05.640664', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-08-31 10:40:58.460939+03:30
31	2023-08-31 11:05:55.9005	repository.controller.decorators	update	'id'	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-24 15:29:05.640664', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string'}, '12')	{'OPERATOR': 'my-key'}	0	2023-08-31 11:05:55.9005+03:30
32	2023-08-31 11:21:45.123825	repository.controller.decorators	update	'id'	({'title': 'تست آپدیت', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': '2023-07-24 15:29:05.640664', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string'}, '34')	{'OPERATOR': 'my-key'}	0	2023-08-31 11:21:45.123825+03:30
33	2023-08-31 11:30:47.754241	repository.controller.decorators	soft_delete	'isDraft'	('34',)	{'OPERATOR': 'my-key'}	0	2023-08-31 11:30:47.754241+03:30
34	2023-09-03 14:31:17.293249	repository.controller.decorators	get_one	tuple index out of range	(4,)	{}	0	2023-09-03 14:31:17.293249+03:30
35	2023-09-03 14:31:17.323829	repository.financ.order_type	search		({},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2023-09-03 14:31:17.323829+03:30
36	2023-09-03 14:31:32.204126	repository.controller.decorators	get_one	tuple index out of range	(4,)	{}	0	2023-09-03 14:31:32.204126+03:30
37	2023-09-03 14:31:32.211567	repository.financ.order_type	search		({},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2023-09-03 14:31:32.211567+03:30
38	2023-09-03 14:31:41.429351	repository.financ.order_type	search	tuple index out of range	({},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2023-09-03 14:31:41.429351+03:30
39	2023-09-05 15:06:20.294259	repository.financ.order	checkOrderBeforCheck	invalid literal for int() with base 10: 'string'	({'products': [{'product_id': 1, 'order_send_id': 'string', 'unit_price': 'string', 'num': 2, 'total_price': 'string', 'gain': 'string', 'send_by': 'string', 'tax': 'string', 'description': 'string', 'is_increase_balance': 'string', 'gain_percentage': 'string', 'tax_percentage': 'string', 'refrence_id': 'string'}], 'account_id': 0, 'due_date': 'string', 'user_id': 'string', 'factor_code': 'string', 'factor_image': 'string', 'title': 'string', 'finall_transportation': 0, 'finall_price': 0, 'finall_gain': 0, 'finall_tax': 0, 'general_gain': 0, 'total_price': 0, 'orders_status': 'string', 'peyment_status': 'string', 'type': 'string', 'payment_type': 'string', 'orders_code': 'string', 'number': 'string', 'code': 'string', 'is_increase_financial_balance': True, 'type_id': 'string', 'send_status': 'string', 'transaction_at': 'string'},)	{}	0	2023-09-05 15:06:20.294259+03:30
40	2023-09-05 15:06:25.1974	repository.financ.order	checkOrderBeforCheck	invalid literal for int() with base 10: 'string'	({'products': [{'product_id': 1, 'order_send_id': 'string', 'unit_price': 'string', 'num': 2, 'total_price': 'string', 'gain': 'string', 'send_by': 'string', 'tax': 'string', 'description': 'string', 'is_increase_balance': 'string', 'gain_percentage': 'string', 'tax_percentage': 'string', 'refrence_id': 'string'}], 'account_id': 0, 'due_date': 'string', 'user_id': 'string', 'factor_code': 'string', 'factor_image': 'string', 'title': 'string', 'finall_transportation': 0, 'finall_price': 0, 'finall_gain': 0, 'finall_tax': 0, 'general_gain': 0, 'total_price': 0, 'orders_status': 'string', 'peyment_status': 'string', 'type': 'string', 'payment_type': 'string', 'orders_code': 'string', 'number': 'string', 'code': 'string', 'is_increase_financial_balance': True, 'type_id': 'string', 'send_status': 'string', 'transaction_at': 'string'},)	{}	0	2023-09-05 15:06:25.1974+03:30
41	2023-09-09 16:59:07.245833	repository.controller.decorators	add	tuple index out of range	({'product_id': 1, 'order_send_id': 'string', 'unit_price': 'string', 'num': 0, 'total_price': 'string', 'gain': 'string', 'send_by': 'string', 'tax': 'string', 'description': 'string', 'is_increase_balance': 't', 'gain_percentage': 'string', 'tax_percentage': 'string', 'refrence_id': 'string', 'order_id': 5},)	{}	0	2023-09-09 16:59:07.245833+03:30
42	2023-09-09 17:00:08.845897	repository.controller.decorators	get_one	tuple index out of range	(1,)	{}	0	2023-09-09 17:00:08.845897+03:30
43	2023-09-09 17:02:30.453238	repository.controller.decorators	get_one	tuple index out of range	(1,)	{}	0	2023-09-09 17:02:30.453238+03:30
44	2023-09-09 17:02:30.470254	repository.financ.order_products	search		({'order_id$eq': 8},)	{}	0	2023-09-09 17:02:30.470254+03:30
45	2023-09-09 17:02:30.472416	repository.controller.decorators	get_one		(8,)	{}	0	2023-09-09 17:02:30.472416+03:30
46	2023-09-09 17:02:30.474538	repository.financ.order	search		({},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2023-09-09 17:02:30.474538+03:30
47	2023-09-10 14:50:37.944579	repository.financ.order	search	list index out of range	({'is_close$eq': None, 'type_id': 1},)	{}	0	2023-09-10 14:50:37.944579+03:30
48	2023-09-10 14:51:06.046528	repository.financ.order	search	invalid input syntax for type boolean: "None"\nLINE 3:        where  is_close = 'None'  and  type_id = '1'  order b...\n                                 ^\n	({'is_close$eq': None, 'type_id$eq': 1},)	{}	0	2023-09-10 14:51:06.046528+03:30
49	2023-09-10 14:52:20.995178	repository.financ.order	search	syntax error at or near "'null'"\nLINE 3:        where  is_close is 'null'  and  type_id = '1'  order ...\n                                  ^\n	({'is_close$eq': 'null', 'type_id$eq': 1},)	{}	0	2023-09-10 14:52:20.995178+03:30
50	2023-09-12 16:55:26.755056	repository.financ.order	search	invalid input syntax for type integer: "False"\nLINE 3: ...  is_close is null  and  type_id = '1'  and  id = 'False'  o...\n                                                             ^\n	({'is_close$eq': 'null', 'type_id$eq': 1, 'id$eq': False},)	{}	0	2023-09-12 16:55:26.755056+03:30
51	2023-09-12 17:08:16.473511	repository.warehouse.cheque	checkOrderBeforCheck	'Cheque' object has no attribute 'order_type_obj'	({'products': [{'product_id': 1, 'unit_id': 0, 'warehouse_id': 0, 'wastage_id': 0, 'transfer_id': 0, 'stock_taking_product_id': 0, 'number': 2, 'description': 'string', 'type': 'string', 'refrence_id': 'string'}], 'order_id': 10, 'warehouse_id': 2, 'warehouse_manager_id': 'string', 'title': 'string', 'description': 'string', 'type': 'string', 'type_id': '1'},)	{}	0	2023-09-12 17:08:16.473511+03:30
60	2023-09-18 17:09:27.225033	repository.warehouse.stock_taking_product	get_or_create_null_record	'StockTakingProduct' object has no attribute 'obj'	(2,)	{}	0	2023-09-18 17:09:27.225033+03:30
52	2023-09-12 17:08:55.904033	repository.controller.decorators	add	insert or update on table "cheque_transfer_product" violates foreign key constraint "cheque_transfer_product_unit_id_fkey"\nDETAIL:  Key (unit_id)=(0) is not present in table "unit".\n	({'product_id': 1, 'unit_id': 0, 'warehouse_id': 0, 'wastage_id': 0, 'transfer_id': 0, 'stock_taking_product_id': 0, 'number': 2, 'description': 'string', 'type': 'string', 'refrence_id': 'string', 'cheque_id': 4, 'order_id': 10, 'is_increase': 't'},)	{'OPERATOR': 'my-key'}	0	2023-09-12 17:08:55.904033+03:30
53	2023-09-12 17:09:31.362335	repository.controller.decorators	add	insert or update on table "cheque_transfer_product" violates foreign key constraint "cheque_transfer_product_warehouse_id_fkey"\nDETAIL:  Key (warehouse_id)=(0) is not present in table "warehouse".\n	({'product_id': 1, 'unit_id': 4, 'warehouse_id': 0, 'wastage_id': 0, 'transfer_id': 0, 'stock_taking_product_id': 0, 'number': 2, 'description': 'string', 'type': 'string', 'refrence_id': 'string', 'cheque_id': 5, 'order_id': 10, 'is_increase': 't'},)	{'OPERATOR': 'my-key'}	0	2023-09-12 17:09:31.362335+03:30
54	2023-09-12 17:10:26.669206	repository.controller.decorators	add	insert or update on table "cheque_transfer_product" violates foreign key constraint "cheque_transfer_product_wastage_id_fkey"\nDETAIL:  Key (wastage_id)=(0) is not present in table "wastage".\n	({'product_id': 1, 'unit_id': 4, 'warehouse_id': 2, 'wastage_id': 0, 'transfer_id': 0, 'stock_taking_product_id': 0, 'number': 2, 'description': 'string', 'type': 'string', 'refrence_id': 'string', 'cheque_id': 6, 'order_id': 10, 'is_increase': 't'},)	{'OPERATOR': 'my-key'}	0	2023-09-12 17:10:26.669206+03:30
55	2023-09-17 17:06:02.268895	repository.controller.decorators	add	tuple index out of range	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}	0	2023-09-17 17:06:02.268895+03:30
56	2023-09-17 17:06:43.084214	repository.controller.decorators	add	syntax error at or near ")"\nLINE 11:          ) RETURNING id;\n                  ^\n	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}	0	2023-09-17 17:06:43.084214+03:30
57	2023-09-17 17:06:58.908232	repository.controller.decorators	add	syntax error at or near ")"\nLINE 11:          ) RETURNING id;\n                  ^\n	({'type_name': 'خرید', 'increase_balance': True, 'increase_financial_balance': False, 'description': 'فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.', 'type_id': 1},)	{'OPERATOR': 'system'}	0	2023-09-17 17:06:58.908232+03:30
58	2023-09-18 17:08:28.354172	repository.controller.decorators	add	'warehouse_goal_id'	({'warehouse_manager_origin_id': '1', 'warehouse_manager_goal_id': 2, 'code': 'null-record', 'title': 'null-record', 'submit_at': 'now()', 'receive_at': 'now()', 'warehouse_origin_id': 2},)	{'OPERATOR': 'system'}	0	2023-09-18 17:08:28.354172+03:30
59	2023-09-18 17:08:28.36285	repository.warehouse.transfer	get_or_create_null_record		(2,)	{}	0	2023-09-18 17:08:28.36285+03:30
61	2023-09-18 17:10:41.088348	repository.controller.decorators	add	tuple index out of range	({'warehouse_manager_id': 1, 'code': 'null-record', 'description': 'null-record', 'warehouse_id': 2},)	{'OPERATOR': 'system'}	0	2023-09-18 17:10:41.088348+03:30
62	2023-09-18 17:10:41.09646	repository.warehouse.stock_taking	get_or_create_null_record		(2,)	{}	0	2023-09-18 17:10:41.09646+03:30
63	2023-09-18 17:10:41.098259	repository.warehouse.stock_taking_product	get_or_create_null_record		(2,)	{}	0	2023-09-18 17:10:41.098259+03:30
64	2023-09-18 17:11:22.971907	repository.controller.decorators	add	tuple index out of range	({'warehouse_manager_id': 1, 'code': 'null-record', 'description': 'null-record', 'warehouse_id': 2},)	{'OPERATOR': 'system'}	0	2023-09-18 17:11:22.971907+03:30
65	2023-09-18 17:12:29.483112	repository.warehouse.stock_taking_product	search	syntax error at or near "="\nLINE 3:        where   = '1'  order by id desc  limit 10 offset 0\n                       ^\n	({'$eq': 1},)	{}	0	2023-09-18 17:12:29.483112+03:30
66	2023-09-18 17:12:29.487876	repository.controller.decorators	get_one		(1,)	{}	0	2023-09-18 17:12:29.487876+03:30
67	2023-09-18 17:12:29.49043	repository.controller.decorators	add		({'warehouse_manager_id': 1, 'code': 'null-record', 'description': 'null-record', 'warehouse_id': 2},)	{'OPERATOR': 'system'}	0	2023-09-18 17:12:29.49043+03:30
68	2023-09-18 17:14:22.291587	repository.controller.decorators	add	not all arguments converted during string formatting	({'current_balance': 0, 'counting_one': 0, 'counting_second': 0, 'counting_third': 0, 'counting_final': 0, 'description': 'null-record', 'refrence_id': 0, 'stock_taking_id': 1},)	{'OPERATOR': 'system'}	0	2023-09-18 17:14:22.291587+03:30
69	2023-09-18 17:21:13.806177	repository.controller.decorators	add	column "is_increase" is of type boolean but expression is of type integer\nLINE 12:     now(),15,'cheque',\n                   ^\nHINT:  You will need to rewrite or cast the expression.\n	({'product_id': 1, 'unit_id': 1, 'wastage_id': 2, 'transfer_id': 1, 'stock_taking_product_id': 1, 'number': 1, 'description': 'string', 'refrence_id': 'string', 'cheque_id': True, 'order_id': 10, 'is_increase': 15, 'warehouse_id': 2, 'type': 'cheque'},)	{'OPERATOR': 'my-key'}	0	2023-09-18 17:21:13.806177+03:30
70	2023-09-19 10:22:44.676974	repository.controller.decorators	add	column "is_increase" is of type boolean but expression is of type integer\nLINE 12:     now(),16,'cheque',\n                   ^\nHINT:  You will need to rewrite or cast the expression.\n	({'product_id': 1, 'unit_id': 1, 'number': 1, 'description': 'string', 'refrence_id': 'string', 'cheque_id': True, 'order_id': 10, 'is_increase': 16, 'warehouse_id': 2, 'type': 'cheque', 'transfer_id': 1, 'stock_taking_product_id': 1, 'wastage_id': 2},)	{'OPERATOR': 'my-key'}	0	2023-09-19 10:22:44.676974+03:30
131	2024-02-27 10:58:47.823369	repository.controller.decorators	get_one	tuple index out of range	(7,)	{}	0	2024-02-27 10:58:47.823369+03:30
132	2024-02-27 12:53:31.411841	repository.product.rate	search		({},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-27 12:53:31.411841+03:30
133	2024-02-27 12:53:43.430499	repository.controller.decorators	get_one	tuple index out of range	(7,)	{}	0	2024-02-27 12:53:43.430499+03:30
134	2024-02-27 12:53:43.488691	repository.product.rate	search		({},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-27 12:53:43.488691+03:30
136	2024-02-27 15:22:02.124454	repository.controller.decorators	soft_delete	column "deleted_at" of relation "category_list" does not exist\nLINE 2:       update category_list set deleted_at = now() \n                                       ^\n	('1',)	{'OPERATOR': 'my-key'}	0	2024-02-27 15:22:02.124454+03:30
138	2024-02-27 15:29:11.286685	repository.controller.decorators	soft_delete	column "deleted_at" of relation "category_list" does not exist\nLINE 2:       update category_list set deleted_at = now() \n                                       ^\n	('1',)	{'OPERATOR': 'my-key'}	0	2024-02-27 15:29:11.286685+03:30
139	2024-02-27 15:30:41.318948	repository.controller.decorators	update	'id'	({'product_id': 1, 'category_id': 'radio', 'order_num': 3}, '1')	{'OPERATOR': 'my-key'}	0	2024-02-27 15:30:41.318948+03:30
71	2023-09-19 12:03:10.361125	aggregations.warehouse.cheque_agg	is_valid_to_update_is_close_is_order	string indices must be integers	(1, 10)	{}	0	2023-09-19 12:03:10.361125+03:30
72	2023-09-19 12:03:10.403322	aggregations.warehouse.cheque_agg	update_is_close_order_if_need		(1, 10)	{}	0	2023-09-19 12:03:10.403322+03:30
73	2023-09-19 12:04:06.414912	aggregations.warehouse.cheque_agg	is_valid_to_update_is_close_is_order	string indices must be integers	(1, 10)	{}	0	2023-09-19 12:04:06.414912+03:30
74	2023-09-19 12:04:06.527663	aggregations.warehouse.cheque_agg	update_is_close_order_if_need		(1, 10)	{}	0	2023-09-19 12:04:06.527663+03:30
75	2023-09-19 12:04:31.184102	aggregations.warehouse.cheque_agg	is_valid_to_update_is_close_is_order	string indices must be integers	(1, 10)	{}	0	2023-09-19 12:04:31.184102+03:30
76	2023-09-19 13:33:26.727215	aggregations.warehouse.cheque_agg	get_open_factor_data	unsupported operand type(s) for +=: 'int' and 'str'	()	{'order_type_id': 1}	0	2023-09-19 13:33:26.727215+03:30
77	2023-09-19 13:34:29.113907	repository.controller.decorators	update_is_close	'id'	(True, 10)	{}	0	2023-09-19 13:34:29.113907+03:30
78	2023-09-19 13:35:02.598518	repository.controller.decorators	update_is_close	'id'	(True, 10)	{}	0	2023-09-19 13:35:02.598518+03:30
79	2023-09-19 13:49:42.683488	repository.controller.decorators	update_is_close	'id'	(True, 10)	{'OPERATOR': 'system'}	0	2023-09-19 13:49:42.683488+03:30
80	2023-09-20 15:42:22.660953	repository.controller.decorators	add	tuple index out of range	({'config': 'none'},)	{'OPERATOR': 'my-key'}	0	2023-09-20 15:42:22.660953+03:30
81	2023-09-20 17:24:17.298179	repository.controller.decorators	add	tuple index out of range	({'product_id': 1, 'feature_id': 3, 'refrence_id': 'string', 'feature_value_id': 5},)	{'OPERATOR': 'my-key'}	0	2023-09-20 17:24:17.298179+03:30
82	2023-09-23 12:06:11.530269	repository.controller.decorators	add	insert or update on table "product_price" violates foreign key constraint "product_price_product_id_fkey"\nDETAIL:  Key (product_id)=(0) is not present in table "product".\n	({'product_id': 0, 'order_id': 0, 'unit_id': 0, 'buy': 0, 'workmate': 0, 'sell_ceiling': 0, 'sell_floor': 0, 'sell_ai': 0, 'percentage_ceiling': 0, 'percentage_floor': 0, 'percentage_ai': 0, 'balance': 0, 'sell': 0, 'is_active': True, 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-09-23 12:06:11.530269+03:30
83	2023-09-23 15:00:05.333641	repository.warehouse.cheque_transfer_product	get_prodcut_balance	'psycopg2.extensions.connection' object has no attribute 'fetchone'	(1,)	{}	0	2023-09-23 15:00:05.333641+03:30
84	2023-09-25 17:05:14.697931	repository.controller.decorators	add	'sell_ai'	({'product_id': 1, 'order_id': 10, 'workmate': 1100, 'sell_ceiling': 1200, 'sell_floor': 1100, 'percentage_ceiling': 20, 'percentage_floor': 10, 'balance': 8, 'sell': 1180, 'is_active': True, 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'unit_id': 1, 'buy': 1000},)	{'OPERATOR': 'my-key'}	0	2023-09-25 17:05:14.697931+03:30
85	2023-09-25 17:10:04.920405	repository.controller.decorators	add	'percentage_ai'	({'product_id': 1, 'order_id': 10, 'workmate': 1100, 'sell_ceiling': 1200, 'sell_floor': 1100, 'percentage_ceiling': 20, 'percentage_floor': 10, 'balance': 8, 'sell': 1180, 'is_active': True, 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'unit_id': 1, 'buy': 1000, 'sell_ai': 'none'},)	{'OPERATOR': 'my-key'}	0	2023-09-25 17:10:04.920405+03:30
86	2023-09-25 17:19:08.696873	repository.controller.decorators	add	invalid input syntax for type double precision: "none"\nLINE 14:     1200, 1100, 'none',\n                         ^\n	({'product_id': 1, 'order_id': 10, 'workmate': 1100, 'sell_ceiling': 1200, 'sell_floor': 1100, 'percentage_ceiling': 20, 'percentage_floor': 10, 'balance': 8, 'sell': 1180, 'is_active': True, 'seller_id': 0, 'guaranty_id': 0, 'refrence_id': 'string', 'unit_id': 1, 'buy': 1000, 'sell_ai': 'none', 'percentage_ai': 0},)	{'OPERATOR': 'my-key'}	0	2023-09-25 17:19:08.696873+03:30
87	2023-09-26 11:18:44.901448	repository.controller.decorators	add	tuple index out of range	({'feature_id': 2, 'feature_value_id': 1, 'product_price_id': 2},)	{'OPERATOR': 'my-key'}	0	2023-09-26 11:18:44.901448+03:30
88	2023-09-26 11:27:27.234634	repository.controller.decorators	get_one	1	(1,)	{}	0	2023-09-26 11:27:27.234634+03:30
89	2023-09-26 11:27:27.282342	repository.product.product	search		({},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2023-09-26 11:27:27.282342+03:30
90	2023-09-26 11:27:46.414774	repository.controller.decorators	get_one	1	(1,)	{}	0	2023-09-26 11:27:46.414774+03:30
91	2023-09-26 11:27:46.444199	repository.product.product	search		({},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2023-09-26 11:27:46.444199+03:30
92	2023-09-26 11:28:12.224977	repository.controller.decorators	get_one	1	(1,)	{}	0	2023-09-26 11:28:12.224977+03:30
93	2023-09-26 11:28:12.272795	repository.product.product	search		({},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2023-09-26 11:28:12.272795+03:30
94	2023-09-26 13:58:34.247238	repository.controller.decorators	add	tuple index out of range	({'product_id': 1, 'category_id': 'موبایل', 'order_num': 1},)	{'OPERATOR': 'my-key'}	0	2023-09-26 13:58:34.247238+03:30
95	2023-09-26 17:21:45.487167	repository.product.product	draft	'Product' object has no attribute 'insert'	({'brand_id': 0, 'unit_id': 0, 'category': 'string', 'model': 'string', 'title': 'string', 'point': 'string', 'weight': 'string', 'weight_unit': 0, 'width': 'string', 'width_unit': 0, 'height': 'string', 'height_unit': 0, 'depth': 'string', 'depth_unit': 0, 'title_en': 'string', 'status': 'string', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'publishDate': 'string', 'isDraft': True},)	{'id': None, 'OPERATOR': 'my-key'}	0	2023-09-26 17:21:45.487167+03:30
96	2023-09-26 17:55:36.59356	repository.product.product	draft	'Product' object has no attribute 'insert'	({'brand_id': 0, 'unit_id': 0, 'category': 'string', 'model': 'string', 'title': 'string', 'point': 'string', 'weight': 'string', 'weight_unit': 0, 'width': 'string', 'width_unit': 0, 'height': 'string', 'height_unit': 0, 'depth': 'string', 'depth_unit': 0, 'title_en': 'string', 'status': 'string', 'user_id': 'string', 'url': 'string', 'visit': 'string', 'popular': 'string', 'sales_number': 'string', 'final_price': 'string', 'final_balance': 'string', 'maximum_in_order': 'string', 'refrence_id': 'string', 'comment_status': 'string', 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'publishDate': 'string', 'isDraft': True},)	{'id': None, 'OPERATOR': 'my-key'}	0	2023-09-26 17:55:36.59356+03:30
97	2023-09-28 15:09:27.348793	repository.controller.decorators	add	null value in column "id" violates not-null constraint\nDETAIL:  Failing row contains (null, موبایل, t, 250, 0, 2023-09-28 15:09:27.331306, null).\n	({'category_id': 'موبایل', 'is_increase': True, 'percentage': 250, 'brand_id': 0},)	{'OPERATOR': 'my-key'}	0	2023-09-28 15:09:27.348793+03:30
98	2023-09-28 15:15:18.620004	repository.controller.decorators	updatePrice	not all arguments converted during string formatting	({'workmate': 3850.0, 'sell': 4130.0, 'sell_ceiling': 4200.0, 'sell_floor': 3850.0},)	{'id': 2, 'OPERATOR': 'system'}	0	2023-09-28 15:15:18.620004+03:30
99	2023-09-28 15:16:30.915506	repository.controller.decorators	updatePrice	not all arguments converted during string formatting	({'workmate': 3850.0, 'sell': 4130.0, 'sell_ceiling': 4200.0, 'sell_floor': 3850.0},)	{'id': 2, 'OPERATOR': 'system'}	0	2023-09-28 15:16:30.915506+03:30
100	2023-09-28 15:17:14.559679	repository.controller.decorators	add	null value in column "id" violates not-null constraint\nDETAIL:  Failing row contains (null, 5, update, 2, 2023-09-28 15:17:14.547022).\n	({'product_price_id': 2, 'action': 'update', 'category_brand_price_action_id': 5},)	{'OPERATOR': 'system'}	0	2023-09-28 15:17:14.559679+03:30
101	2023-09-28 16:02:38.330361	repository.controller.decorators	add	not all arguments converted during string formatting	({'product_price_id': 2, 'action': 'update', 'category_brand_price_action_id': 11, 'workmate': 1000.0, 'sell': 1000.0, 'sell_ceiling': 1000.0, 'sell_floor': 1000.0},)	{'OPERATOR': 'system'}	0	2023-09-28 16:02:38.330361+03:30
102	2023-09-28 17:52:31.416585	repository.controller.decorators	add	insert or update on table "wastage" violates foreign key constraint "wastage_warehouse_id_fkey"\nDETAIL:  Key (warehouse_id)=(0) is not present in table "warehouse".\n	({'unit_id': 1, 'warehouse_id': 0, 'product_id': 1, 'warehouse_manager_id': 'string', 'number': 1, 'description': '', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-09-28 17:52:31.416585+03:30
103	2023-09-28 18:10:24.264639	repository.financ.account	search	column "orders_code" does not exist\nLINE 3:        where  orders_code = 'null-record'  order by id desc ...\n                      ^\n	({'orders_code$eq': 'null-record'},)	{}	0	2023-09-28 18:10:24.264639+03:30
104	2023-09-28 18:10:24.269325	repository.financ.account	get_or_create_null_record		()	{}	0	2023-09-28 18:10:24.269325+03:30
105	2023-09-28 18:10:24.271074	repository.financ.order	get_or_create_null_record		()	{}	0	2023-09-28 18:10:24.271074+03:30
106	2023-09-28 18:10:55.09171	repository.financ.account	get_or_create_null_record	string indices must be integers	()	{}	0	2023-09-28 18:10:55.09171+03:30
107	2023-09-28 18:10:55.096095	repository.financ.order	get_or_create_null_record		()	{}	0	2023-09-28 18:10:55.096095+03:30
108	2023-09-28 18:14:30.56636	repository.financ.order	get_or_create_null_record	string indices must be integers	()	{}	0	2023-09-28 18:14:30.56636+03:30
109	2023-09-28 18:15:00.314986	repository.financ.order	get_or_create_null_record	string indices must be integers	()	{}	0	2023-09-28 18:15:00.314986+03:30
110	2023-09-28 18:15:29.791829	repository.financ.order	get_or_create_null_record	string indices must be integers	()	{}	0	2023-09-28 18:15:29.791829+03:30
111	2023-09-28 18:16:09.68079	repository.financ.order	get_or_create_null_record	string indices must be integers	()	{}	0	2023-09-28 18:16:09.68079+03:30
112	2023-09-28 18:17:09.611407	repository.financ.order	get_or_create_null_record	string indices must be integers	()	{}	0	2023-09-28 18:17:09.611407+03:30
113	2023-09-28 18:18:02.383039	repository.financ.order	get_or_create_null_record	string indices must be integers	()	{}	0	2023-09-28 18:18:02.383039+03:30
114	2023-09-28 18:18:41.706922	repository.financ.order	get_or_create_null_record	string indices must be integers	()	{}	0	2023-09-28 18:18:41.706922+03:30
115	2023-09-28 18:19:07.212848	repository.financ.order	get_or_create_null_record	'is_actvie'	()	{}	0	2023-09-28 18:19:07.212848+03:30
116	2023-09-28 18:19:33.426464	repository.financ.order	get_or_create_null_record	'products'	()	{}	0	2023-09-28 18:19:33.426464+03:30
117	2023-09-30 13:52:54.78122	repository.controller.decorators	add	'submit_at'	({'products': [{'product_id': 1, 'unit_id': 0, 'number': 2, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 2, 'warehouse_manager_origin_id': 'string', 'title': 'تست', 'warehouse_goal_id': 3, 'warehouse_manager_goal_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2023-09-30 13:52:54.78122+03:30
118	2023-09-30 14:04:12.201307	repository.warehouse.cheque	get_or_create_null_record	get_or_create_null_record() got an unexpected keyword argument 'order_id'	()	{'order_id': 11, 'warehouse_id': 2}	0	2023-09-30 14:04:12.201307+03:30
119	2023-09-30 14:11:41.839317	repository.warehouse.cheque	get_or_create_null_record	get_or_create_null_record() got an unexpected keyword argument 'order_id'	()	{'order_id': 11, 'warehouse_id': 2}	0	2023-09-30 14:11:41.839317+03:30
120	2023-09-30 15:20:13.458623	repository.controller.decorators	add	invalid input syntax for type timestamp: "string"\nLINE 11:     'string',now(),'string'\n                            ^\n	({'products': [{'product_id': 1, 'unit_id': 1, 'number': 2, 'description': 'string', 'refrence_id': 'string'}], 'warehouse_origin_id': 2, 'warehouse_manager_origin_id': 'string', 'title': 'string', 'warehouse_goal_id': 3, 'warehouse_manager_goal_id': 'string', 'submit_at': 'string', 'receive_at': ''},)	{'OPERATOR': 'my-key'}	0	2023-09-30 15:20:13.458623+03:30
121	2023-10-01 11:43:49.507494	repository.warehouse.cheque_transfer_product	search	list index out of range	({'wastage_id': '2'},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2023-10-01 11:43:49.507494+03:30
122	2023-10-01 11:50:46.322368	repository.warehouse.cheque_transfer_product	search	list index out of range	({'warehouse_id': '2'},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2023-10-01 11:50:46.322368+03:30
123	2023-10-01 15:28:33.841856	repository.controller.decorators	add	'warehouse_manager_id'	({'counting_one': 10, 'counting_second': 11, 'counting_third': 11, 'counting_final': 10, 'description': 'string', 'refrence_id': 1, 'product_id': 0, 'unit_id': 0, 'stock_taking_id': 5, 'current_balance': 0},)	{'OPERATOR': 'my-key'}	0	2023-10-01 15:28:33.841856+03:30
124	2023-10-01 15:30:17.869213	repository.controller.decorators	add	'warehouse_manager_id'	({'counting_one': 10, 'counting_second': 11, 'counting_third': 11, 'counting_final': 10, 'description': 'string', 'refrence_id': 1, 'product_id': 0, 'unit_id': 0, 'stock_taking_id': 6, 'current_balance': 0},)	{'OPERATOR': 'my-key'}	0	2023-10-01 15:30:17.869213+03:30
125	2023-10-02 13:02:24.921719	repository.controller.decorators	add	'finished_at'	({'product_id': 1, 'product_price_id': 2, 'warehouse_id': 1, 'user_id': 'string', 'type_user_id': 'string', 'number': 2, 'per_price': 7200, 'send_by': 'string', 'next_buy': True},)	{'OPERATOR': 'my-key'}	0	2023-10-02 13:02:24.921719+03:30
126	2023-10-05 13:41:05.85694	repository.product.basket	search	list index out of range	({'order_status$None': None, 'user_id&eq': 'string'},)	{}	0	2023-10-05 13:41:05.85694+03:30
127	2023-10-15 11:52:49.932394	repository.controller.decorators	add	add() got an unexpected keyword argument 'is_null'	({'name': 'null-record', 'account_bank': 'null-record', 'account_number': 'null-record', 'account_id': 4},)	{'is_null': True, 'OPERATOR': 'system'}	0	2023-10-15 11:52:49.932394+03:30
128	2023-10-15 12:02:19.564947	repository.controller.decorators	add	add() got an unexpected keyword argument 'is_null'	({'user_id': 'string', 'amount': 0, 'is_increase': False, 'type_id': 4, 'table_name': 'null-record', 'table_id': '', 'is_real': False, 'gift_reminder': '', 'order_id': 13, 'transaction_id': 0},)	{'is_null': True, 'OPERATOR': 'system'}	0	2023-10-15 12:02:19.564947+03:30
148	2024-02-28 12:30:23.088306	repository.brand.brand	search	list index out of range	({'offset': '15'},)	{'limit': 20, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 12:30:23.088306+03:30
129	2023-10-15 12:02:44.422963	repository.controller.decorators	add	column "status" is of type timestamp without time zone but expression is of type integer\nLINE 16:     'پرداخت آنلاین', 0, 2,\n                                 ^\nHINT:  You will need to rewrite or cast the expression.\n	({'account_number_origin': '', 'account_card_origin': '', 'account_shaba_origin': '', 'peyment_getway_id': 1, 'type_manual': 'پرداخت آنلاین', 'type_id': 1, 'status_id': 'پرداخت شده', 'status': 2, 'id_manual': 0, 'transfer_at': '2023-10-15 07:11:28.437998', 'wallet_id': 1, 'pos_id': 1, 'account_number_goal': '2333333333333', 'account_card_goal': '5041721085367911', 'account_shaba_goal': 'IR640700001000118207215001', 'amount': 2000.0, 'user_id': 'string', 'order_id': 13, 'account_id': '1'},)	{'OPERATOR': 'system'}	0	2023-10-15 12:02:44.422963+03:30
130	2023-10-15 13:07:28.284561	repository.controller.decorators	add	column "status" is of type timestamp without time zone but expression is of type integer\nLINE 16:     'پرداخت آنلاین', 0, 2,\n                                 ^\nHINT:  You will need to rewrite or cast the expression.\n	({'account_number_origin': '', 'account_card_origin': '', 'account_shaba_origin': '', 'peyment_getway_id': 1, 'type_manual': 'پرداخت آنلاین', 'type_id': 1, 'status_id': 'پرداخت شده', 'status': 2, 'id_manual': 0, 'transfer_at': '2023-10-15 07:11:28.437998', 'wallet_id': 1, 'pos_id': 1, 'account_number_goal': '2333333333333', 'account_card_goal': '5041721085367911', 'account_shaba_goal': 'IR640700001000118207215001', 'amount': 2000.0, 'user_id': 'string', 'order_id': 13, 'account_id': '1'},)	{'OPERATOR': 'system'}	0	2023-10-15 13:07:28.284561+03:30
135	2024-02-27 15:20:16.396477	repository.controller.decorators	recovery	column "deleted_at" of relation "category_list" does not exist\nLINE 2:          update category_list set deleted_at = null \n                                          ^\n	('1',)	{'OPERATOR': 'my-key'}	0	2024-02-27 15:20:16.396477+03:30
137	2024-02-27 15:22:20.171996	repository.controller.decorators	recovery	column "deleted_at" of relation "category_list" does not exist\nLINE 2:          update category_list set deleted_at = null \n                                          ^\n	('1',)	{'OPERATOR': 'my-key'}	0	2024-02-27 15:22:20.171996+03:30
140	2024-02-27 15:30:52.585139	repository.controller.decorators	soft_delete	column "deleted_at" of relation "category_list" does not exist\nLINE 2:       update category_list set deleted_at = now() \n                                       ^\n	('3',)	{'OPERATOR': 'my-key'}	0	2024-02-27 15:30:52.585139+03:30
141	2024-02-27 15:31:21.302624	repository.controller.decorators	update	'id'	({'product_id': 1, 'category_id': 'rrr', 'order_num': 2}, '3')	{'OPERATOR': 'my-key'}	0	2024-02-27 15:31:21.302624+03:30
142	2024-02-27 15:59:20.30935	repository.controller.decorators	soft_delete	column "deleted_at" of relation "category_list" does not exist\nLINE 2:       update category_list set deleted_at = now() \n                                       ^\n	('3',)	{'OPERATOR': 'my-key'}	0	2024-02-27 15:59:20.30935+03:30
143	2024-02-27 16:01:21.684376	repository.controller.decorators	soft_delete	column "deleted_at" of relation "category_list" does not exist\nLINE 2:       update category_list set deleted_at = now() \n                                       ^\n	('3',)	{'OPERATOR': 'my-key'}	0	2024-02-27 16:01:21.684376+03:30
144	2024-02-27 16:02:48.849659	repository.controller.decorators	soft_delete	column "deleted_at" of relation "category_list" does not exist\nLINE 2:       update category_list set deleted_at = now() \n                                       ^\n	('3',)	{'OPERATOR': 'my-key'}	0	2024-02-27 16:02:48.849659+03:30
145	2024-02-27 16:03:01.848906	repository.controller.decorators	hard_delete	column "deleted_at" does not exist\nLINE 4:       CURRENT_DATE - date(deleted_at) >= 30\n                                  ^\n	('3',)	{'OPERATOR': 'my-key'}	0	2024-02-27 16:03:01.848906+03:30
146	2024-02-27 16:08:56.262635	repository.controller.decorators	hard_delete	column "deleted_at" does not exist\nLINE 4:       CURRENT_DATE - date(deleted_at) >= 30\n                                  ^\n	('3',)	{'OPERATOR': 'my-key'}	0	2024-02-27 16:08:56.262635+03:30
147	2024-02-27 16:34:22.708971	repository.brand.brand	unpublish	unpublish() missing 1 required positional argument: 'id'	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': 'string', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2024-02-27 16:34:22.708971+03:30
149	2024-02-28 14:32:07.652535	repository.brand.brand	search	list index out of range	({'desc': 'false'},)	{'limit': 20, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 14:32:07.652535+03:30
150	2024-02-28 14:32:12.548722	repository.brand.brand	search	list index out of range	({'desc': '0'},)	{'limit': 20, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 14:32:12.548722+03:30
151	2024-02-28 14:32:37.529151	repository.brand.brand	search	list index out of range	({'desc': '0'},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 14:32:37.529151+03:30
152	2024-02-28 14:34:19.995227	repository.brand.brand	search	list index out of range	({'offset': '20'},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 14:34:19.995227+03:30
153	2024-02-28 14:36:30.089987	repository.brand.brand	search	list index out of range	({'(15,5)': ''},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 14:36:30.089987+03:30
154	2024-02-28 14:36:41.378315	repository.brand.brand	search	list index out of range	({'1': ''},)	{'limit': 10, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 14:36:41.378315+03:30
155	2024-02-28 15:01:44.981819	repository.brand.brand	search	list index out of range	({'offset': '5'},)	{'limit': 20, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 15:01:44.981819+03:30
156	2024-02-28 15:03:04.705578	repository.brand.brand	search	list index out of range	({'order_by': "'title'"},)	{'limit': 20, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 15:03:04.705578+03:30
157	2024-02-28 15:03:31.705388	repository.brand.brand	search	list index out of range	({'order_by': 'title'},)	{'limit': 20, 'offset': 0, 'order_by': False, 'desc': True}	0	2024-02-28 15:03:31.705388+03:30
158	2024-02-28 16:26:44.068193	repository.brand.brand	unpublish	unpublish() missing 1 required positional argument: 'id'	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': 'string', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2024-02-28 16:26:44.068193+03:30
159	2024-02-28 16:38:57.854174	repository.brand.brand	unpublish	unpublish() missing 1 required positional argument: 'id'	({'title': 'string', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': 'string', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2024-02-28 16:38:57.854174+03:30
160	2024-02-28 16:39:11.390022	repository.brand.brand	unpublish	unpublish() missing 1 required positional argument: 'id'	({'title': 'ضضضضضضض', 'title_en': 'string', 'logo': 'string', 'alt_logo': 'string', 'description': 'string', 'video': 'string', 'percentage_floor': 0, 'percentage_ceiling': 0, 'publishDate': 'string', 'isDraft': True, 'language': 'string', 'viewMode': 'string', 'seo': 'string', 'refrence_id': 'string'},)	{'OPERATOR': 'my-key'}	0	2024-02-28 16:39:11.390022+03:30
161	2024-03-02 16:02:01.553268	repository.controller.decorators	add	insert or update on table "brand_image" violates foreign key constraint "brand_image_brand_id_fkey"\nDETAIL:  Key (brand_id)=(0) is not present in table "brand".\n	({'brand_id': 0, 'url': 'string', 'alt': 'string'},)	{'OPERATOR': 'my-key'}	0	2024-03-02 16:02:01.553268+03:30
\.


--
-- Data for Name: facktor_info; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.facktor_info (id, order_id, type, value, key) FROM stdin;
\.


--
-- Data for Name: feature; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.feature (id, title, show_up, inserted_at, deleted_at, language) FROM stdin;
1	سایز	t	2023-07-22 11:27:27.164078	\N	string
2	سری پردازنده	t	2023-07-22 11:28:06.866318	\N	string
3	ظرفیت حافظه داخلی	t	2023-07-22 11:28:13.20197	\N	string
4	دقت صفحه نمایش	t	2023-07-22 11:32:26.232008	\N	string
5	اندازه	t	2023-08-31 11:47:37.864259	\N	string
6	جنس	f	2023-09-19 13:56:19.193064	\N	string
7	string	t	2023-09-25 11:58:27.693892	\N	string
8	Test-data	t	2023-09-25 12:57:53.223213	\N	English
9	strinhhhhg	t	2023-09-27 14:54:30.735417	\N	string
10	sadsad	t	2023-09-27 15:01:14.41694	\N	sadsad
11		f	2023-09-27 15:10:19.225857	\N	
12	ssasadsadsad	t	2023-09-27 15:10:39.708313	\N	dsadsa
13	aminian.aasddddddddddd@gmail.com	t	2023-09-27 15:27:06.289328	\N	Amirreza
14	asaa@g	t	2023-09-27 15:38:42.538529	\N	Adiineeeeeeeee
15	sasas@gmail.com	t	2023-09-27 15:40:04.482463	\N	Adiineeeeeeeee
16	amin@gmail.com	t	2023-09-30 10:26:46.009185	\N	Adiineeeeeeeee
17	sasasa	t	2023-09-30 10:32:47.943678	\N	sadsad
18	assasa	t	2023-09-30 10:33:07.268133	\N	assa
19	sasasasa	t	2023-09-30 10:35:39.801411	\N	Adiineeeeeeeee
20	Default Title	f	2023-09-30 10:41:38.982561	\N	Adiineeeeeeeee
21	sasa2121	t	2023-09-30 10:43:35.748707	\N	sasasa
22	3223232323	t	2023-09-30 10:43:35.756504	\N	Adiineeeeeeeee
23	qwqwwqwq	t	2023-09-30 10:46:07.236622	\N	wqwqwq
24	saassasa	t	2023-09-30 10:46:42.003718	\N	assasasa
25	saasas@gmail	t	2023-09-30 11:00:06.851233	\N	Adiineeeeeeeee
26	asasa	t	2023-09-30 11:32:38.764179	\N	Adiineeeeeeeee
27	122112assasa	t	2023-09-30 11:52:09.388823	\N	amirreza Aminian
28	zxxzxz	t	2023-09-30 12:42:03.900493	\N	xzxzxz
29	zxxzxzassa	t	2023-09-30 12:42:29.485171	\N	xzxzxzxxxx
30	aminian.amirreza@gmail.com	t	2023-09-30 12:44:05.555015	\N	amirreza
31	a@gmail.com	t	2023-09-30 12:44:55.584899	\N	Amirreza
32	mm	t	2023-09-30 12:46:53.910258	\N	Amirreza
33	ssss	t	2023-09-30 12:47:07.795136	\N	Adiineeeeeeeee
\.


--
-- Data for Name: feature_value; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.feature_value (id, value, language) FROM stdin;
1	یک ترابایت	\N
2	Intel	\N
3	چهار گیگابایت	\N
4	Core i3	\N
5	2 ترابایت	\N
\.


--
-- Data for Name: feature_values_category; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.feature_values_category (id, feature_value_id, feature_id, category_id, is_filter, inserted_at, deleted_at, feature_sort_id, language, feature_value_sort_id) FROM stdin;
1	1	1	1	t	2023-07-25 17:04:03.391286	\N	1	string	1
2	2	2	1	t	2023-08-31 11:48:54.091604	\N	0	string	0
\.


--
-- Data for Name: financial_document; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.financial_document (id, order_id, account_id, wallet_id, transaction_id, withdraw_wallet_id, text, user_id, amount, account_number_orgin, account_number_goal, created_at, deleted_at, is_pattern, type_id, type_peyment, peyment_getway_id) FROM stdin;
\.


--
-- Data for Name: giftcard; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.giftcard (id, code, receiver, amount, creator, inserted_at, is_use, name, card_url) FROM stdin;
\.


--
-- Data for Name: holding_hands; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.holding_hands (id, order_id, account_id, amount, payer, user_id_receiver, account_number, created_at, deleted_at, type_id, is_add_transaction, is_add_wallet, is_transfer) FROM stdin;
\.


--
-- Data for Name: log_price_action; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.log_price_action (id, category_brand_price_action_id, action, product_price_id, created_at, workmate, sell, sell_ceiling, sell_floor) FROM stdin;
3	12	update	2	2023-09-28 16:03:29.982245	1000	1000	1000	1000
4	16	update	2	2023-09-28 16:06:17.701271	1000	1000	1000	1000
5	17	restore	2	2023-09-28 16:06:37.091558	1200	1200	1200	1200
6	18	update	2	2023-09-28 16:22:02.696581	1000	1000	1000	1000
7	20	update	2	2023-09-28 16:23:51.270466	2000	5000	3000	4000
8	21	update	2	2023-09-28 16:24:04.118777	2400	6000	3600	4800
\.


--
-- Data for Name: my_order; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.my_order (id, account_id, transaction_at, due_date, user_id, factor_code, factor_image, title, finall_transportation, finall_price, finall_gain, finall_tax, general_gain, total_price, orders_status, peyment_status, type, payment_type, orders_code, number, created_at, code, is_increase_financial_balance, type_id, deleted_at, send_status, is_close) FROM stdin;
10	3	2023-09-10 11:33:37	2023-09-10 11:33:37	string	string	string	string	0	10000	0	0	0	0	string	پرداخت نشده	خرید	string	string	string	2023-09-10 11:36:53.545516	vuBvhgUoSU	f	1	\N	ارسال نشده	t
11	4	2023-09-28 18:19:33.402013	2023-09-28 18:19:33.402013	null-record	null-record	null-record	null-record	0	0	0	0	0	0	null-record	پرداخت نشده	خرید	null-record	null-record	0	2023-09-28 18:19:33.402013	ZWffYyF1Uc	f	1	\N	ارسال نشده	\N
12	4	2023-10-05 14:19:37.053016	2023-10-05 14:19:37.053016	string			ثبت فاکتور خرید string 	0	14400	0	0	0	0	ارسال نشده	پرداخت نشده	فروش	null-record	none	0	2023-10-05 14:19:37.053016	At7xEaySUo	t	2	\N	ارسال نشده	\N
13	1	2023-10-15 11:52:49.543307	2023-10-15 10:29:23.512498	string			ثبت فاکتور خرید string 	0	2000	0	0	0	0	ارسال نشده	پرداخت شده	فروش	پرداخت آنلاین	none	0	2023-10-15 10:29:23.512498	5sXEnw9fx8	t	2	\N	ارسال نشده	\N
\.


--
-- Data for Name: order_products; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.order_products (id, order_id, product_id, order_send_id, unit_price, num, total_price, gain, send_by, tax, description, is_increase_balance, gain_percentage, tax_percentage, deleted_at, refrence_id) FROM stdin;
3	10	1	string	1000	10	10000	0	string	0	string	t	0	0	\N	string
\.


--
-- Data for Name: order_send; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.order_send (id, order_id, sending_type, pursuit_code, recieve_date, sending_price, recieve_code, recieve_start_time, recieve_end_time, total_price) FROM stdin;
\.


--
-- Data for Name: order_type; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.order_type (id, type_name, increase_balance, increase_financial_balance, description, type_id) FROM stdin;
5	خرید	t	f	فاکتور خرید، برای فاکتور ورود به انبار استفاده می شود.	1
6	فروش	f	t	فاکتور فروش بعد از ثبت سفارش مشتری ثبت می شود و برای خروج از انبار استفاده می شود	2
7	برگشت از خرید	f	t	اگر خرید محصول برگشت بخورد محصول از انبار خارج می شود.	3
8	برگشت از فروش	t	f	اگر مشتری سفارش را کنسل کند. جنس به انبار وارد می شود.	4
\.


--
-- Data for Name: pos; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.pos (id, account_id, name, account_bank, account_number, created_at, deleted_at) FROM stdin;
1	4	null-record	null-record	null-record	2023-10-15 11:59:33.227969	\N
\.


--
-- Data for Name: pos_transactions; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.pos_transactions (id, pos_id, account_id, order_id, created_at, deleted_at, account_number, user_id, type_id, is_add_transaction, is_add_wallet, amount) FROM stdin;
\.


--
-- Data for Name: poz_transactions; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.poz_transactions (id, pos_id, account_id, order_id, created_at, deleted_at, account_number, user_id, type_id, is_add_transaction, is_add_wallet, poz_id, amount) FROM stdin;
\.


--
-- Data for Name: price_config_term; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.price_config_term (id, config) FROM stdin;
1	none
\.


--
-- Data for Name: price_feature_values; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.price_feature_values (id, feature_id, feature_value_id, product_price_id) FROM stdin;
1	2	1	2
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.product (id, brand_id, unit_id, category, model, title, point, weight, weight_unit, width, width_unit, height, height_unit, depth, depth_unit, title_en, status, code, inserted_at, deleted_at, user_id, url, visit, popular, sales_number, final_price, final_balance, maximum_in_order, refrence_id, comment_status, language, viewmode, seo, publishdate, isdraft, is_seo_url_ok, seo_url_last_response, seo_id, question, view, "viewCategory", "questionOppened") FROM stdin;
1	1	1	1	string	پفک	string	string	1	string	1	string	1	string	1	string	string	string	2023-07-26 13:27:55.450788	\N	string	string	string	string	string	string	string	string	string	string	string	string	string	2023-07-24 14:55:08.668891	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: product_barcode; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.product_barcode (id, product_id, value, key, refrence_id) FROM stdin;
\.


--
-- Data for Name: product_feature_values; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.product_feature_values (id, product_id, feature_id, refrence_id, feature_value_id) FROM stdin;
1	1	3	string	5
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.product_images (id, product_id, url, alt, color, deleted_at, inserted_at, type_media) FROM stdin;
\.


--
-- Data for Name: product_price; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.product_price (id, product_id, order_id, unit_id, buy, workmate, sell_ceiling, sell_floor, sell_ai, percentage_ceiling, percentage_floor, percentage_ai, balance, sell, is_active, inserted_at, seller_id, guaranty_id, refrence_id) FROM stdin;
2	1	10	1	1000	2880	4320	5760	0	20	10	0	8	1000	t	2023-09-25 17:19:27.967101	0	0	string
\.


--
-- Data for Name: product_rate; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.product_rate (id, product_id, rate_id, refrence_id) FROM stdin;
1	1	1	string
2	1	2	string
3	1	3	string
\.


--
-- Data for Name: rate; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.rate (id, title) FROM stdin;
1	کیفیت و کارایی
2	قیمت و ارزش خرید
3	ابعاد یا سایز
4	شباهت یا مغایرت
5	string
6	string2
7	string
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.review (id, product_id, title, text, user_id, inserted_at, deleted_at, refrence_id) FROM stdin;
1	1	مقاله 1	string	string	2023-07-29 13:56:01.300622	\N	string
2	1	مقاله 2	string	string	2023-07-29 13:56:01.316488	\N	string
\.


--
-- Data for Name: stock_taking; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.stock_taking (id, warehouse_id, warehouse_manager_id, code, description, created_at, deleted_at) FROM stdin;
15	2	1	NW0BOtkM1q	string	2023-10-01 15:38:38.127984	\N
16	2	1	kAXQx24xxD	string	2023-10-01 15:40:05.216185	\N
17	2	1	z3lQ47CEZ5	string	2023-10-01 15:41:38.814138	\N
18	2	1	xvh2UiZIQU	string	2023-10-01 15:48:39.417806	\N
19	2	1	ZircxTLwYs	string	2023-10-01 15:49:37.724946	\N
\.


--
-- Data for Name: stock_taking_product; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.stock_taking_product (id, current_balance, counting_one, counting_second, counting_third, counting_final, description, created_at, deleted_at, refrence_id, stock_taking_id, product_id) FROM stdin;
1	0	0	0	0	0	null-record	2023-09-18 17:21:13.69897	\N	0	1	\N
8	3	10	11	11	10	string	2023-10-01 15:41:39.011971	\N	1	17	1
9	3	10	11	11	10	string	2023-10-01 15:48:39.714357	\N	1	18	1
10	10	10	11	11	9	string	2023-10-01 15:49:38.010206	\N	1	19	1
\.


--
-- Data for Name: task_queue; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.task_queue (id, date, hour, miunte, args, kwargs, status, created_at, updated_at, class_name, function_name, response_error) FROM stdin;
1	2023-08-08 13:36:39	10	30	('my args ', 'my id')	{'OPERATOR' : 'hassan'}	none	2023-08-08 14:24:41.543405	\N	Brand	publish	publish
2	2023-08-08 13:36:39	10	30	('my args ', 'my id')	{'OPERATOR' : 'hassan'}	none	2023-08-08 14:25:24.841966	\N	Brand	publish	publish
\.


--
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.transaction (id, order_id, account_id, wallet_id, pos_id, account_number_origin, account_card_origin, account_shaba_origin, account_number_goal, account_card_goal, account_shaba_goal, amount, peyment_getway_id, type_manual, id_manual, status, type_id, created_at, transfer_at, deleted_at, user_id, status_id) FROM stdin;
1	13	1	1	1				2333333333333	5041721085367911	IR640700001000118207215001	2000.0	1	پرداخت آنلاین	0	پرداخت شده	1	2023-10-15 13:14:05.192811	2023-10-15 07:11:28.437998	\N	string	2
\.


--
-- Data for Name: transfer; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.transfer (id, warehouse_origin_id, warehouse_manager_origin_id, code, title, warehouse_goal_id, warehouse_manager_goal_id, created_at, submit_at, receive_at, deleted_at) FROM stdin;
1	2	1	null-record	null-record	2	1	2023-09-18 17:09:27.155766	2023-09-18 17:09:27.155766	2023-09-18 17:09:27.155766	\N
2	2	string	vUHkkyzToo	string	3	string	2023-09-30 14:04:11.322212	2023-09-30 14:04:11.322212	\N	\N
3	2	string	1U7TeWXPzN	string	3	string	2023-09-30 14:11:40.75217	2023-09-30 14:11:40.75217	\N	\N
4	2	string	yuxoceiYxo	string	3	string	2023-09-30 14:16:46.671354	2023-09-30 14:16:46.671354	\N	\N
5	2	string	5JpI9qdTVd	string	3	string	2023-09-30 14:17:43.594065	2023-09-30 14:17:43.594065	\N	\N
6	2	string	Xiiday6QIu	string	3	string	2023-09-30 14:18:59.610363	2023-09-30 14:18:59.610363	\N	\N
7	2	string	1qltNO1YD9	string	3	string	2023-09-30 14:20:30.511721	2023-09-30 14:20:30.511721	\N	\N
8	3	string	86eP4vddsN	string	2	string	2023-09-30 15:13:47.483588	2023-09-30 15:13:47.483588	2023-09-30 15:19:32.226847	\N
9	2	string	RCaV4T4A0i	string	3	string	2023-09-30 15:20:21.534181	2023-09-30 15:20:21.534181	2023-09-30 15:20:22.285704	\N
\.


--
-- Data for Name: unit; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.unit (id, title, language) FROM stdin;
1	کیلوگرم	\N
2	سانتی متر	\N
3	متر	\N
4	تعداد	\N
\.


--
-- Data for Name: wallet; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.wallet (id, order_id, transaction_id, user_id, amount, is_increase, type_id, table_name, table_id, created_at, deleted_at, is_real, gift_reminder) FROM stdin;
1	13	0	string	0	f	4	null-record		2023-10-15 12:02:44.381095	\N	false	
\.


--
-- Data for Name: warehouse; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.warehouse (id, title, height, dimension, address, postal_code, x_location, y_location, inserted_at, deleted_at, is_active) FROM stdin;
2	انبار شماره 1	string	string	string	string	string	string	2023-08-12 11:16:48.340229	\N	t
3	انبار شماره 3	string	string	string	string	string	string	2023-09-30 12:50:42.158543	\N	t
\.


--
-- Data for Name: warehouse_managers; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.warehouse_managers (id, warehouse_id, manager_id) FROM stdin;
2	2	string
\.


--
-- Data for Name: warehouse_phones; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.warehouse_phones (id, warehouse_id, phone) FROM stdin;
\.


--
-- Data for Name: wastage; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.wastage (id, unit_id, warehouse_id, product_id, warehouse_manager_id, number, description, created_at, deleted_at, refrence_id) FROM stdin;
1	1	2	1	1	3	توضیح انبار گردانی	2023-08-12 15:12:06.754011	\N	string
2	4	2	1		0	null-record	2023-09-18 17:21:13.718385	\N	1
4	1	2	1	string	1		2023-09-28 17:52:55.766105	\N	string
5	1	2	1	string	1		2023-09-28 18:09:50.72452	\N	string
6	1	2	1	string	1		2023-09-28 18:10:23.258811	\N	string
7	1	2	1	string	1		2023-09-28 18:10:54.015726	\N	string
8	1	2	1	string	1		2023-09-28 18:14:29.679589	\N	string
9	1	2	1	string	1		2023-09-28 18:14:59.419926	\N	string
10	1	2	1	string	1		2023-09-28 18:15:28.719677	\N	string
11	1	2	1	string	1		2023-09-28 18:16:08.68789	\N	string
12	1	2	1	string	1		2023-09-28 18:17:08.664053	\N	string
13	1	2	1	string	1		2023-09-28 18:18:01.330419	\N	string
14	1	2	1	string	1		2023-09-28 18:18:40.702286	\N	string
15	1	2	1	string	1		2023-09-28 18:19:06.031096	\N	string
16	1	2	1	string	1		2023-09-28 18:19:31.712679	\N	string
17	1	2	1	string	1		2023-09-28 18:20:12.203587	\N	string
18	1	2	1	string	1		2023-09-28 18:20:51.197997	\N	string
19	1	2	1	string	1		2023-09-28 18:21:15.242334	\N	string
\.


--
-- Data for Name: withdraw_wallet; Type: TABLE DATA; Schema: public; Owner: mahtdy
--

COPY public.withdraw_wallet (id, account_id, user_id, amount, created_at, status, account_number, account_card, account_shaba) FROM stdin;
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.account_id_seq', 4, true);


--
-- Name: bank_check_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.bank_check_id_seq', 1, false);


--
-- Name: bank_receipt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.bank_receipt_id_seq', 1, false);


--
-- Name: basket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.basket_id_seq', 2, true);


--
-- Name: brand_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.brand_category_id_seq', 1, false);


--
-- Name: brand_feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.brand_feature_id_seq', 3, true);


--
-- Name: brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.brand_id_seq', 35, true);


--
-- Name: brand_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.brand_image_id_seq', 5, true);


--
-- Name: category_brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.category_brand_id_seq', 1, false);


--
-- Name: category_brand_price_action_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.category_brand_price_action_id_seq', 21, true);


--
-- Name: category_brand_price_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.category_brand_price_id_seq', 1, true);


--
-- Name: category_feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.category_feature_id_seq', 1, false);


--
-- Name: category_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.category_list_id_seq', 3, true);


--
-- Name: category_rate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.category_rate_id_seq', 1, false);


--
-- Name: cheque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.cheque_id_seq', 64, true);


--
-- Name: cheque_transfer_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.cheque_transfer_product_id_seq', 32, true);


--
-- Name: credit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.credit_id_seq', 1, false);


--
-- Name: database_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.database_log_id_seq', 552, true);


--
-- Name: discount_calander_banner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.discount_calander_banner_id_seq', 1, false);


--
-- Name: discount_calander_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.discount_calander_id_seq', 1, false);


--
-- Name: discount_calander_list_banner_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.discount_calander_list_banner_category_id_seq', 1, false);


--
-- Name: discount_calander_list_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.discount_calander_list_codes_id_seq', 1, false);


--
-- Name: discount_calander_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.discount_calander_list_id_seq', 1, false);


--
-- Name: discount_calander_msg_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.discount_calander_msg_id_seq', 1, false);


--
-- Name: discount_calander_msg_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.discount_calander_msg_media_id_seq', 1, false);


--
-- Name: discount_calander_msg_reciever_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.discount_calander_msg_reciever_id_seq', 1, false);


--
-- Name: error_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.error_log_id_seq', 161, true);


--
-- Name: facktor_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.facktor_info_id_seq', 1, false);


--
-- Name: feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.feature_id_seq', 33, true);


--
-- Name: feature_value_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.feature_value_id_seq', 5, true);


--
-- Name: feature_values_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.feature_values_category_id_seq', 2, true);


--
-- Name: financial_document_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.financial_document_id_seq', 1, false);


--
-- Name: giftcard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.giftcard_id_seq', 1, false);


--
-- Name: holding_hands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.holding_hands_id_seq', 1, false);


--
-- Name: log_price_action_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.log_price_action_id_seq', 8, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.order_id_seq', 13, true);


--
-- Name: order_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.order_products_id_seq', 3, true);


--
-- Name: order_send_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.order_send_id_seq', 1, false);


--
-- Name: order_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.order_type_id_seq', 288, true);


--
-- Name: pos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.pos_id_seq', 1, true);


--
-- Name: pos_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.pos_transactions_id_seq', 1, false);


--
-- Name: poz_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.poz_transactions_id_seq', 1, false);


--
-- Name: price_config_term_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.price_config_term_id_seq', 1, true);


--
-- Name: price_feature_values_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.price_feature_values_id_seq', 1, true);


--
-- Name: product_barcode_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.product_barcode_id_seq', 1, false);


--
-- Name: product_feature_values_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.product_feature_values_id_seq', 3, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.product_id_seq', 1, true);


--
-- Name: product_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.product_images_id_seq', 1, false);


--
-- Name: product_price_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.product_price_id_seq', 3, true);


--
-- Name: product_rate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.product_rate_id_seq', 4, true);


--
-- Name: rate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.rate_id_seq', 7, true);


--
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.review_id_seq', 2, true);


--
-- Name: stock_taking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.stock_taking_id_seq', 19, true);


--
-- Name: stock_taking_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.stock_taking_product_id_seq', 10, true);


--
-- Name: task_queue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.task_queue_id_seq', 2, true);


--
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.transaction_id_seq', 1, true);


--
-- Name: transfer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.transfer_id_seq', 9, true);


--
-- Name: unit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.unit_id_seq', 4, true);


--
-- Name: wallet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.wallet_id_seq', 1, true);


--
-- Name: warehouse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.warehouse_id_seq', 3, true);


--
-- Name: warehouse_managers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.warehouse_managers_id_seq', 2, true);


--
-- Name: warehouse_phones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.warehouse_phones_id_seq', 1, false);


--
-- Name: wastage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.wastage_id_seq', 19, true);


--
-- Name: withdraw_wallet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mahtdy
--

SELECT pg_catalog.setval('public.withdraw_wallet_id_seq', 1, false);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: bank_check bank_check_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.bank_check
    ADD CONSTRAINT bank_check_pkey PRIMARY KEY (id);


--
-- Name: bank_receipt bank_receipt_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.bank_receipt
    ADD CONSTRAINT bank_receipt_pkey PRIMARY KEY (id);


--
-- Name: basket basket_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_pkey PRIMARY KEY (id);


--
-- Name: brand_category brand_category_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_category
    ADD CONSTRAINT brand_category_pkey PRIMARY KEY (id);


--
-- Name: brand_feature brand_feature_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_feature
    ADD CONSTRAINT brand_feature_pkey PRIMARY KEY (id);


--
-- Name: brand_image brand_image_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_image
    ADD CONSTRAINT brand_image_pkey PRIMARY KEY (id);


--
-- Name: brand brand_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand
    ADD CONSTRAINT brand_pkey PRIMARY KEY (id);


--
-- Name: category_brand category_brand_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_brand
    ADD CONSTRAINT category_brand_pkey PRIMARY KEY (id);


--
-- Name: category_brand_price_action category_brand_price_action_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_brand_price_action
    ADD CONSTRAINT category_brand_price_action_pkey PRIMARY KEY (id);


--
-- Name: category_brand_price category_brand_price_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_brand_price
    ADD CONSTRAINT category_brand_price_pkey PRIMARY KEY (id);


--
-- Name: category_feature category_feature_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_feature
    ADD CONSTRAINT category_feature_pkey PRIMARY KEY (id);


--
-- Name: category_list category_list_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_list
    ADD CONSTRAINT category_list_pkey PRIMARY KEY (id);


--
-- Name: category_rate category_rate_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_rate
    ADD CONSTRAINT category_rate_pkey PRIMARY KEY (id);


--
-- Name: cheque cheque_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque
    ADD CONSTRAINT cheque_pkey PRIMARY KEY (id);


--
-- Name: cheque_transfer_product cheque_transfer_product_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product
    ADD CONSTRAINT cheque_transfer_product_pkey PRIMARY KEY (id);


--
-- Name: credit credit_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.credit
    ADD CONSTRAINT credit_pkey PRIMARY KEY (id);


--
-- Name: database_log database_log_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.database_log
    ADD CONSTRAINT database_log_pkey PRIMARY KEY (id);


--
-- Name: discount_calander_banner discount_calander_banner_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_banner
    ADD CONSTRAINT discount_calander_banner_pkey PRIMARY KEY (id);


--
-- Name: discount_calander_list_banner_category discount_calander_list_banner_category_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list_banner_category
    ADD CONSTRAINT discount_calander_list_banner_category_pkey PRIMARY KEY (id);


--
-- Name: discount_calander_list_codes discount_calander_list_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list_codes
    ADD CONSTRAINT discount_calander_list_codes_pkey PRIMARY KEY (id);


--
-- Name: discount_calander_list discount_calander_list_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list
    ADD CONSTRAINT discount_calander_list_pkey PRIMARY KEY (id);


--
-- Name: discount_calander_msg_media discount_calander_msg_media_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_msg_media
    ADD CONSTRAINT discount_calander_msg_media_pkey PRIMARY KEY (id);


--
-- Name: discount_calander_msg discount_calander_msg_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_msg
    ADD CONSTRAINT discount_calander_msg_pkey PRIMARY KEY (id);


--
-- Name: discount_calander_msg_reciever discount_calander_msg_reciever_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_msg_reciever
    ADD CONSTRAINT discount_calander_msg_reciever_pkey PRIMARY KEY (id);


--
-- Name: discount_calander discount_calander_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander
    ADD CONSTRAINT discount_calander_pkey PRIMARY KEY (id);


--
-- Name: error_log error_log_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.error_log
    ADD CONSTRAINT error_log_pkey PRIMARY KEY (id);


--
-- Name: facktor_info facktor_info_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.facktor_info
    ADD CONSTRAINT facktor_info_pkey PRIMARY KEY (id);


--
-- Name: feature feature_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.feature
    ADD CONSTRAINT feature_pkey PRIMARY KEY (id);


--
-- Name: feature feature_title_u; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.feature
    ADD CONSTRAINT feature_title_u UNIQUE (title);


--
-- Name: feature_value feature_value_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.feature_value
    ADD CONSTRAINT feature_value_pkey PRIMARY KEY (id);


--
-- Name: feature_values_category feature_values_category_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.feature_values_category
    ADD CONSTRAINT feature_values_category_pkey PRIMARY KEY (id);


--
-- Name: financial_document financial_document_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.financial_document
    ADD CONSTRAINT financial_document_pkey PRIMARY KEY (id);


--
-- Name: giftcard giftcard_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.giftcard
    ADD CONSTRAINT giftcard_pkey PRIMARY KEY (id);


--
-- Name: holding_hands holding_hands_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.holding_hands
    ADD CONSTRAINT holding_hands_pkey PRIMARY KEY (id);


--
-- Name: log_price_action log_price_action_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.log_price_action
    ADD CONSTRAINT log_price_action_pkey PRIMARY KEY (id);


--
-- Name: my_order order_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.my_order
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: order_products order_products_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_pkey PRIMARY KEY (id);


--
-- Name: order_send order_send_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.order_send
    ADD CONSTRAINT order_send_pkey PRIMARY KEY (id);


--
-- Name: order_type order_type_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.order_type
    ADD CONSTRAINT order_type_pkey PRIMARY KEY (id);


--
-- Name: pos pos_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.pos
    ADD CONSTRAINT pos_pkey PRIMARY KEY (id);


--
-- Name: pos_transactions pos_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.pos_transactions
    ADD CONSTRAINT pos_transactions_pkey PRIMARY KEY (id);


--
-- Name: poz_transactions poz_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.poz_transactions
    ADD CONSTRAINT poz_transactions_pkey PRIMARY KEY (id);


--
-- Name: price_config_term price_config_term_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.price_config_term
    ADD CONSTRAINT price_config_term_pkey PRIMARY KEY (id);


--
-- Name: price_feature_values price_feature_values_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.price_feature_values
    ADD CONSTRAINT price_feature_values_pkey PRIMARY KEY (id);


--
-- Name: product_barcode product_barcode_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_barcode
    ADD CONSTRAINT product_barcode_pkey PRIMARY KEY (id);


--
-- Name: product_feature_values product_feature_values_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_feature_values
    ADD CONSTRAINT product_feature_values_pkey PRIMARY KEY (id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: product_price product_price_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_price
    ADD CONSTRAINT product_price_pkey PRIMARY KEY (id);


--
-- Name: product_rate product_rate_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_rate
    ADD CONSTRAINT product_rate_pkey PRIMARY KEY (id);


--
-- Name: rate rate_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.rate
    ADD CONSTRAINT rate_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: stock_taking stock_taking_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.stock_taking
    ADD CONSTRAINT stock_taking_pkey PRIMARY KEY (id);


--
-- Name: stock_taking_product stock_taking_product_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.stock_taking_product
    ADD CONSTRAINT stock_taking_product_pkey PRIMARY KEY (id);


--
-- Name: task_queue task_queue_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.task_queue
    ADD CONSTRAINT task_queue_pkey PRIMARY KEY (id);


--
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- Name: transfer transfer_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.transfer
    ADD CONSTRAINT transfer_pkey PRIMARY KEY (id);


--
-- Name: unit unit_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.unit
    ADD CONSTRAINT unit_pkey PRIMARY KEY (id);


--
-- Name: unit unit_title_u; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.unit
    ADD CONSTRAINT unit_title_u UNIQUE (title);


--
-- Name: wallet wallet_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.wallet
    ADD CONSTRAINT wallet_pkey PRIMARY KEY (id);


--
-- Name: warehouse_managers warehouse_managers_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.warehouse_managers
    ADD CONSTRAINT warehouse_managers_pkey PRIMARY KEY (id);


--
-- Name: warehouse_phones warehouse_phones_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.warehouse_phones
    ADD CONSTRAINT warehouse_phones_pkey PRIMARY KEY (id);


--
-- Name: warehouse warehouse_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.warehouse
    ADD CONSTRAINT warehouse_pkey PRIMARY KEY (id);


--
-- Name: wastage wastage_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.wastage
    ADD CONSTRAINT wastage_pkey PRIMARY KEY (id);


--
-- Name: withdraw_wallet withdraw_wallet_pkey; Type: CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.withdraw_wallet
    ADD CONSTRAINT withdraw_wallet_pkey PRIMARY KEY (id);


--
-- Name: ix_account_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_account_id ON public.account USING btree (id);


--
-- Name: ix_bank_check_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_bank_check_id ON public.bank_check USING btree (id);


--
-- Name: ix_bank_receipt_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_bank_receipt_id ON public.bank_receipt USING btree (id);


--
-- Name: ix_basket_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_basket_id ON public.basket USING btree (id);


--
-- Name: ix_brand_category_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_brand_category_id ON public.brand_category USING btree (id);


--
-- Name: ix_brand_feature_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_brand_feature_id ON public.brand_feature USING btree (id);


--
-- Name: ix_brand_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_brand_id ON public.brand USING btree (id);


--
-- Name: ix_brand_image_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_brand_image_id ON public.brand_image USING btree (id);


--
-- Name: ix_category_brand_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_category_brand_id ON public.category_brand USING btree (id);


--
-- Name: ix_category_brand_price_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_category_brand_price_id ON public.category_brand_price USING btree (id);


--
-- Name: ix_category_feature_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_category_feature_id ON public.category_feature USING btree (id);


--
-- Name: ix_category_list_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_category_list_id ON public.category_list USING btree (id);


--
-- Name: ix_category_rate_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_category_rate_id ON public.category_rate USING btree (id);


--
-- Name: ix_cheque_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_cheque_id ON public.cheque USING btree (id);


--
-- Name: ix_cheque_transfer_product_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_cheque_transfer_product_id ON public.cheque_transfer_product USING btree (id);


--
-- Name: ix_credit_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_credit_id ON public.credit USING btree (id);


--
-- Name: ix_database_log_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_database_log_id ON public.database_log USING btree (id);


--
-- Name: ix_discount_calander_banner_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_discount_calander_banner_id ON public.discount_calander_banner USING btree (id);


--
-- Name: ix_discount_calander_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_discount_calander_id ON public.discount_calander USING btree (id);


--
-- Name: ix_discount_calander_list_banner_category_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_discount_calander_list_banner_category_id ON public.discount_calander_list_banner_category USING btree (id);


--
-- Name: ix_discount_calander_list_codes_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_discount_calander_list_codes_id ON public.discount_calander_list_codes USING btree (id);


--
-- Name: ix_discount_calander_list_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_discount_calander_list_id ON public.discount_calander_list USING btree (id);


--
-- Name: ix_discount_calander_msg_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_discount_calander_msg_id ON public.discount_calander_msg USING btree (id);


--
-- Name: ix_discount_calander_msg_media_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_discount_calander_msg_media_id ON public.discount_calander_msg_media USING btree (id);


--
-- Name: ix_discount_calander_msg_reciever_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_discount_calander_msg_reciever_id ON public.discount_calander_msg_reciever USING btree (id);


--
-- Name: ix_error_log_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_error_log_id ON public.error_log USING btree (id);


--
-- Name: ix_facktor_info_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_facktor_info_id ON public.facktor_info USING btree (id);


--
-- Name: ix_feature_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_feature_id ON public.feature USING btree (id);


--
-- Name: ix_feature_value_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_feature_value_id ON public.feature_value USING btree (id);


--
-- Name: ix_feature_values_category_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_feature_values_category_id ON public.feature_values_category USING btree (id);


--
-- Name: ix_financial_document_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_financial_document_id ON public.financial_document USING btree (id);


--
-- Name: ix_giftcard_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_giftcard_id ON public.giftcard USING btree (id);


--
-- Name: ix_holding_hands_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_holding_hands_id ON public.holding_hands USING btree (id);


--
-- Name: ix_order_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_order_id ON public.my_order USING btree (id);


--
-- Name: ix_order_products_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_order_products_id ON public.order_products USING btree (id);


--
-- Name: ix_order_send_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_order_send_id ON public.order_send USING btree (id);


--
-- Name: ix_order_type_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_order_type_id ON public.order_type USING btree (id);


--
-- Name: ix_pos_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_pos_id ON public.pos USING btree (id);


--
-- Name: ix_pos_transactions_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_pos_transactions_id ON public.pos_transactions USING btree (id);


--
-- Name: ix_poz_transactions_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_poz_transactions_id ON public.poz_transactions USING btree (id);


--
-- Name: ix_price_config_term_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_price_config_term_id ON public.price_config_term USING btree (id);


--
-- Name: ix_price_feature_values_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_price_feature_values_id ON public.price_feature_values USING btree (id);


--
-- Name: ix_product_barcode_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_product_barcode_id ON public.product_barcode USING btree (id);


--
-- Name: ix_product_feature_values_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_product_feature_values_id ON public.product_feature_values USING btree (id);


--
-- Name: ix_product_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_product_id ON public.product USING btree (id);


--
-- Name: ix_product_images_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_product_images_id ON public.product_images USING btree (id);


--
-- Name: ix_product_price_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_product_price_id ON public.product_price USING btree (id);


--
-- Name: ix_product_rate_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_product_rate_id ON public.product_rate USING btree (id);


--
-- Name: ix_rate_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_rate_id ON public.rate USING btree (id);


--
-- Name: ix_review_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_review_id ON public.review USING btree (id);


--
-- Name: ix_stock_taking_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_stock_taking_id ON public.stock_taking USING btree (id);


--
-- Name: ix_stock_taking_product_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_stock_taking_product_id ON public.stock_taking_product USING btree (id);


--
-- Name: ix_task_queue_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_task_queue_id ON public.task_queue USING btree (id);


--
-- Name: ix_transaction_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_transaction_id ON public.transaction USING btree (id);


--
-- Name: ix_transfer_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_transfer_id ON public.transfer USING btree (id);


--
-- Name: ix_unit_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_unit_id ON public.unit USING btree (id);


--
-- Name: ix_wallet_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_wallet_id ON public.wallet USING btree (id);


--
-- Name: ix_warehouse_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_warehouse_id ON public.warehouse USING btree (id);


--
-- Name: ix_warehouse_managers_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_warehouse_managers_id ON public.warehouse_managers USING btree (id);


--
-- Name: ix_warehouse_phones_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_warehouse_phones_id ON public.warehouse_phones USING btree (id);


--
-- Name: ix_wastage_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_wastage_id ON public.wastage USING btree (id);


--
-- Name: ix_withdraw_wallet_id; Type: INDEX; Schema: public; Owner: mahtdy
--

CREATE INDEX ix_withdraw_wallet_id ON public.withdraw_wallet USING btree (id);


--
-- Name: bank_check bank_check_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.bank_check
    ADD CONSTRAINT bank_check_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: bank_check bank_check_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.bank_check
    ADD CONSTRAINT bank_check_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: bank_receipt bank_receipt_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.bank_receipt
    ADD CONSTRAINT bank_receipt_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: bank_receipt bank_receipt_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.bank_receipt
    ADD CONSTRAINT bank_receipt_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: basket basket_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: basket basket_product_price_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_product_price_id_fkey FOREIGN KEY (product_price_id) REFERENCES public.product_price(id);


--
-- Name: basket basket_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.basket
    ADD CONSTRAINT basket_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouse(id);


--
-- Name: brand_category brand_category_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_category
    ADD CONSTRAINT brand_category_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(id);


--
-- Name: brand_feature brand_feature_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_feature
    ADD CONSTRAINT brand_feature_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(id);


--
-- Name: brand_feature brand_feature_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_feature
    ADD CONSTRAINT brand_feature_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.feature(id);


--
-- Name: brand_feature brand_feature_feature_value_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_feature
    ADD CONSTRAINT brand_feature_feature_value_id_fkey FOREIGN KEY (feature_value_id) REFERENCES public.feature_value(id);


--
-- Name: brand_image brand_image_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.brand_image
    ADD CONSTRAINT brand_image_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(id);


--
-- Name: category_brand_price_action c_b_p_a_b_fk; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_brand_price_action
    ADD CONSTRAINT c_b_p_a_b_fk FOREIGN KEY (brand_id) REFERENCES public.brand(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: category_brand category_brand_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_brand
    ADD CONSTRAINT category_brand_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(id);


--
-- Name: category_brand_price category_brand_price_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_brand_price
    ADD CONSTRAINT category_brand_price_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(id);


--
-- Name: category_feature category_feature_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_feature
    ADD CONSTRAINT category_feature_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.feature(id);


--
-- Name: category_list category_list_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_list
    ADD CONSTRAINT category_list_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: category_rate category_rate_rate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.category_rate
    ADD CONSTRAINT category_rate_rate_id_fkey FOREIGN KEY (rate_id) REFERENCES public.rate(id);


--
-- Name: cheque cheque_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque
    ADD CONSTRAINT cheque_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: cheque_transfer_product cheque_transfer_product_cheque_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product
    ADD CONSTRAINT cheque_transfer_product_cheque_id_fkey FOREIGN KEY (cheque_id) REFERENCES public.cheque(id);


--
-- Name: cheque_transfer_product cheque_transfer_product_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product
    ADD CONSTRAINT cheque_transfer_product_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: cheque_transfer_product cheque_transfer_product_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product
    ADD CONSTRAINT cheque_transfer_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: cheque_transfer_product cheque_transfer_product_stock_taking_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product
    ADD CONSTRAINT cheque_transfer_product_stock_taking_product_id_fkey FOREIGN KEY (stock_taking_product_id) REFERENCES public.stock_taking_product(id);


--
-- Name: cheque_transfer_product cheque_transfer_product_transfer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product
    ADD CONSTRAINT cheque_transfer_product_transfer_id_fkey FOREIGN KEY (transfer_id) REFERENCES public.transfer(id);


--
-- Name: cheque_transfer_product cheque_transfer_product_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product
    ADD CONSTRAINT cheque_transfer_product_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: cheque_transfer_product cheque_transfer_product_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product
    ADD CONSTRAINT cheque_transfer_product_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouse(id);


--
-- Name: cheque_transfer_product cheque_transfer_product_wastage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque_transfer_product
    ADD CONSTRAINT cheque_transfer_product_wastage_id_fkey FOREIGN KEY (wastage_id) REFERENCES public.wastage(id);


--
-- Name: cheque cheque_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.cheque
    ADD CONSTRAINT cheque_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouse(id);


--
-- Name: discount_calander_banner discount_calander_banner_discount_calander_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_banner
    ADD CONSTRAINT discount_calander_banner_discount_calander_id_fkey FOREIGN KEY (discount_calander_id) REFERENCES public.discount_calander(id);


--
-- Name: discount_calander_list_banner_category discount_calander_list_banner_ca_discount_calander_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list_banner_category
    ADD CONSTRAINT discount_calander_list_banner_ca_discount_calander_list_id_fkey FOREIGN KEY (discount_calander_list_id) REFERENCES public.discount_calander_list(id);


--
-- Name: discount_calander_list_banner_category discount_calander_list_banner_category_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list_banner_category
    ADD CONSTRAINT discount_calander_list_banner_category_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(id);


--
-- Name: discount_calander_list_codes discount_calander_list_codes_discount_calander_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list_codes
    ADD CONSTRAINT discount_calander_list_codes_discount_calander_list_id_fkey FOREIGN KEY (discount_calander_list_id) REFERENCES public.discount_calander_list(id);


--
-- Name: discount_calander_list discount_calander_list_discount_calander_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_list
    ADD CONSTRAINT discount_calander_list_discount_calander_id_fkey FOREIGN KEY (discount_calander_id) REFERENCES public.discount_calander(id);


--
-- Name: discount_calander_msg discount_calander_msg_discount_calander_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_msg
    ADD CONSTRAINT discount_calander_msg_discount_calander_id_fkey FOREIGN KEY (discount_calander_id) REFERENCES public.discount_calander(id);


--
-- Name: discount_calander_msg_media discount_calander_msg_media_discount_calander_msg_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_msg_media
    ADD CONSTRAINT discount_calander_msg_media_discount_calander_msg_id_fkey FOREIGN KEY (discount_calander_msg_id) REFERENCES public.discount_calander_msg(id);


--
-- Name: discount_calander_msg_reciever discount_calander_msg_reciever_discount_calander_msg_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.discount_calander_msg_reciever
    ADD CONSTRAINT discount_calander_msg_reciever_discount_calander_msg_id_fkey FOREIGN KEY (discount_calander_msg_id) REFERENCES public.discount_calander_msg(id);


--
-- Name: facktor_info facktor_info_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.facktor_info
    ADD CONSTRAINT facktor_info_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: feature_values_category feature_values_category_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.feature_values_category
    ADD CONSTRAINT feature_values_category_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.feature(id);


--
-- Name: feature_values_category feature_values_category_feature_value_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.feature_values_category
    ADD CONSTRAINT feature_values_category_feature_value_id_fkey FOREIGN KEY (feature_value_id) REFERENCES public.feature_value(id);


--
-- Name: financial_document financial_document_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.financial_document
    ADD CONSTRAINT financial_document_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: financial_document financial_document_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.financial_document
    ADD CONSTRAINT financial_document_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: financial_document financial_document_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.financial_document
    ADD CONSTRAINT financial_document_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transaction(id);


--
-- Name: financial_document financial_document_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.financial_document
    ADD CONSTRAINT financial_document_wallet_id_fkey FOREIGN KEY (wallet_id) REFERENCES public.wallet(id);


--
-- Name: financial_document financial_document_withdraw_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.financial_document
    ADD CONSTRAINT financial_document_withdraw_wallet_id_fkey FOREIGN KEY (withdraw_wallet_id) REFERENCES public.withdraw_wallet(id);


--
-- Name: holding_hands holding_hands_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.holding_hands
    ADD CONSTRAINT holding_hands_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: holding_hands holding_hands_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.holding_hands
    ADD CONSTRAINT holding_hands_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: log_price_action l_p_a_cbp_fk; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.log_price_action
    ADD CONSTRAINT l_p_a_cbp_fk FOREIGN KEY (category_brand_price_action_id) REFERENCES public.category_brand_price_action(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: log_price_action l_p_a_pp_fk; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.log_price_action
    ADD CONSTRAINT l_p_a_pp_fk FOREIGN KEY (product_price_id) REFERENCES public.product_price(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: warehouse_managers m_fk_w; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.warehouse_managers
    ADD CONSTRAINT m_fk_w FOREIGN KEY (warehouse_id) REFERENCES public.warehouse(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_products order_products_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: order_products order_products_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: order_send order_send_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.order_send
    ADD CONSTRAINT order_send_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: pos pos_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.pos
    ADD CONSTRAINT pos_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: pos_transactions pos_transactions_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.pos_transactions
    ADD CONSTRAINT pos_transactions_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: pos_transactions pos_transactions_pos_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.pos_transactions
    ADD CONSTRAINT pos_transactions_pos_id_fkey FOREIGN KEY (pos_id) REFERENCES public.pos(id);


--
-- Name: poz_transactions poz_transactions_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.poz_transactions
    ADD CONSTRAINT poz_transactions_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: poz_transactions poz_transactions_pos_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.poz_transactions
    ADD CONSTRAINT poz_transactions_pos_id_fkey FOREIGN KEY (pos_id) REFERENCES public.pos(id);


--
-- Name: price_feature_values price_feature_values_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.price_feature_values
    ADD CONSTRAINT price_feature_values_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.feature(id);


--
-- Name: price_feature_values price_feature_values_feature_value_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.price_feature_values
    ADD CONSTRAINT price_feature_values_feature_value_id_fkey FOREIGN KEY (feature_value_id) REFERENCES public.feature_value(id);


--
-- Name: price_feature_values price_feature_values_product_price_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.price_feature_values
    ADD CONSTRAINT price_feature_values_product_price_id_fkey FOREIGN KEY (product_price_id) REFERENCES public.product_price(id);


--
-- Name: product_barcode product_barcode_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_barcode
    ADD CONSTRAINT product_barcode_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product product_brand_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brand(id);


--
-- Name: product_feature_values product_feature_values_feature_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_feature_values
    ADD CONSTRAINT product_feature_values_feature_id_fkey FOREIGN KEY (feature_id) REFERENCES public.feature(id);


--
-- Name: product_feature_values product_feature_values_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_feature_values
    ADD CONSTRAINT product_feature_values_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_images product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_price product_price_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_price
    ADD CONSTRAINT product_price_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: product_price product_price_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_price
    ADD CONSTRAINT product_price_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_price product_price_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_price
    ADD CONSTRAINT product_price_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: product_rate product_rate_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_rate
    ADD CONSTRAINT product_rate_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: product_rate product_rate_rate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product_rate
    ADD CONSTRAINT product_rate_rate_id_fkey FOREIGN KEY (rate_id) REFERENCES public.rate(id);


--
-- Name: product product_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: review review_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: stock_taking stock_taking_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.stock_taking
    ADD CONSTRAINT stock_taking_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouse(id);


--
-- Name: transaction transaction_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: transaction transaction_pos_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pos_id_fkey FOREIGN KEY (pos_id) REFERENCES public.pos(id);


--
-- Name: transaction transaction_wallet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_wallet_id_fkey FOREIGN KEY (wallet_id) REFERENCES public.wallet(id);


--
-- Name: wallet wallet_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.wallet
    ADD CONSTRAINT wallet_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.my_order(id);


--
-- Name: wastage wastage_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.wastage
    ADD CONSTRAINT wastage_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: wastage wastage_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.wastage
    ADD CONSTRAINT wastage_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: wastage wastage_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.wastage
    ADD CONSTRAINT wastage_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouse(id);


--
-- Name: withdraw_wallet withdraw_wallet_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mahtdy
--

ALTER TABLE ONLY public.withdraw_wallet
    ADD CONSTRAINT withdraw_wallet_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- PostgreSQL database dump complete
--

