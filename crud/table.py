from connect_db import connect_to_database, close_connection
from utils.extract_table_detail import extract_detail


'''

--- CREATE---   

'''

def new_table (table_name, script, x, y, file_id):
    connection = connect_to_database()
    if connection.is_connected():
        cursor = connection.cursor()
        sql_insert_query = """ INSERT INTO `tbl_table` (`table_name`,`script`, `x`, `y`, `file_id`) VALUES (%s, %s, %s, %s,%s)"""
        cursor.execute(sql_insert_query, (table_name, script, x, y, file_id))
        connection.commit()
        print("db: Successfully added new table!")
        
        
        

'''

--- READ ---   

'''
# get ALL tables
def get_all_tables(file_id):
    connection = connect_to_database()
    if connection.is_connected():
        cursor = connection.cursor()
        sql_search_query = """
                SELECT
                  tbl.`table_id`,
                  tbl.`script`,
                  tbl.`x`,
                  tbl.`y`
                FROM 
                  `tbl_table` AS tbl
                JOIN 
                  `tbl_fk` AS fk 
                ON 
                  tbl.`file_id` = fk.`file_id`
                WHERE 
                  tbl.`file_id` = %s
                """
        cursor.execute(sql_search_query, (file_id,))
        records = cursor.fetchall()
        
        # extract detail from the records
        records_dict = extract_detail(records)
        
        return records_dict
      
 

# get specific table     
def get_specific_table(table_name):
    connection = connect_to_database()
    cursor = connection.cursor()
    sql_search_query = """ SELECT `table_id` FROM `tbl_table` WHERE `table_name` = %s"""
    cursor.execute(sql_search_query, (table_name,))
    
    record = cursor.fetchone()
    
    return record
