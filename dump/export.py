import re

def convert_sql(input_file, output_file):
    with open(input_file, 'r') as file:
        lines = file.readlines()

    with open(output_file, 'w') as file:
        for line in lines:
            # Remove lines starting with 'SET'
            if line.startswith('SET'):
                continue
            # Remove lines with PostgreSQL-specific commands
            if 'public.' in line:
                line = line.replace('public.', '')
            # Replace PostgreSQL-specific data types
            line = re.sub(r'\bSERIAL\b', 'INTEGER', line)
            line = re.sub(r'\bBIGINT\b', 'INTEGER', line)
            # Add more replacements as needed

            file.write(line)

convert_sql('shop.sql', 'shop_sqlite.sql')
