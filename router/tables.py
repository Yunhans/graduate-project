from fastapi import APIRouter, Request, status
from pydantic import BaseModel


from crud.table import new_table, get_all_tables, get_table, update_table_info, update_table_position, delete_table
from utils.extract_table_detail import extract_details, extract_detail
from utils.json_script import generate_sql_script


router = APIRouter(
    prefix="/api/table",
    tags=["file"],
)


'''

--- create new table (erd) ---
        
        -params: file_id, table_name, script

'''

class TableCreateRequest(BaseModel):
    file_id: str
    table_name: str
    script: str
    x: str
    y: str



@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_new_table(request: TableCreateRequest):
    file_id = request.file_id
    table_name = request.table_name
    script = request.script
    x = request.x
    y = request.y
    
    result = new_table(table_name, script, x, y, file_id)
    
    return result



'''

--- get all the tables ---

    (script --> erd)
    -params: file_id 

'''

@router.get("/get/{file_id}", status_code=status.HTTP_200_OK)
async def get_all_table(file_id):
    table_list = get_all_tables(file_id)
    table_list_extract = extract_details(table_list)
    
    return table_list_extract



'''

--- get all the tables ---

    (erd --> script)
    -params: file_id

'''

@router.get("/get/toscript/{file_id}", status_code=status.HTTP_200_OK)
async def get_all_table_to_script(file_id):
    table_list = get_all_tables(file_id)
    script = generate_sql_script(table_list)
    
    return script
    


'''

--- get specific table ---

    -params: file_id

'''

@router.get("/get/specific/{file_id}", status_code=status.HTTP_200_OK)
async def get_specific_table(file_id):
    table_list = get_table(file_id)
    table_list_extract = extract_detail(table_list)
    
    return table_list_extract

'''

--- update table info (erd)---

    -params: table_id, table_name, script

'''

class TableUpdateInfoRequest(BaseModel):
    table_id: str
    table_name: str
    script: str



@router.put("/update/info", status_code=status.HTTP_200_OK)
async def update_table_info_(request: TableUpdateInfoRequest):
    table_id = request.table_id
    table_name = request.table_name
    script = request.script
    
    result = update_table_info(table_id, table_name, script)
    
    return result



'''

--- update table position (erd)---

    -params: table_id, x, y

'''

class TableUpdatePositionRequest(BaseModel):
    table_id: str
    x: str
    y: str



@router.put("/update/position", status_code=status.HTTP_200_OK)
async def update_table_position_(request: TableUpdatePositionRequest):
    table_id = request.table_id
    x = request.x
    y = request.y
    
    result = update_table_position(table_id, x, y)
    
    return result



'''

--- delete table (erd)

    -params: table_id

'''

@router.delete("/delete/{table_id}", status_code=status.HTTP_200_OK)
async def delete_table_(table_id):
    result = delete_table(table_id)
    
    return result
    