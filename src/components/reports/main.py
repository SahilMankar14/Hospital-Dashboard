import requests
import os
from bs4 import BeautifulSoup
import pandas as pd
from fastapi import FastAPI,Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List,Dict
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this with your frontend URL in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
def generate_and_process_balance_sheet(from_date:int,to_date:int)->List[Dict[str,str]]:
    # Get input from the user
    # from_date = int(input("Enter the FROM DATE IN YYYYMMDD (e.g., 20220401): "))
    # to_date = int(input("Enter the TO DATE IN YYYYMMDD (e.g., 20230331): "))

    # Generate XML data
    data = f"""<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <EXPORTDATA>
      <REQUESTDESC>
        <STATICVARIABLES>
          <!--Specify the FROM DATE here-->
          <SVFROMDATE>{from_date}</SVFROMDATE>
          <!--Specify the TO DATE here-->
          <SVTODATE>{to_date}</SVTODATE>
          <SVEXPORTFORMAT>$$SysName:VERTICAL</SVEXPORTFORMAT>
          <SVEXPORTFORMAT>$$SysName:HTML</SVEXPORTFORMAT>
         </STATICVARIABLES>
        <!--Report Name-->
        <REPORTNAME>Balance Sheet</REPORTNAME>
      </REQUESTDESC>
    </EXPORTDATA>
  </BODY>
</ENVELOPE>"""

    # Send request to Tally
    url = "http://localhost:9000"
    headers = {"Content-Type": "application/xml"}
    response = requests.request("POST", url, headers=headers, data=data)

    # Write response to file
    specific_filename = "balancesheet2.html"
    result_folder = "C:/Users/jaint/Downloads/dashboard/dashboard/src/components/reports/Tally/Balancesheet"
    result_file = os.path.join(result_folder, specific_filename)
    with open(result_file, "w") as file:
        file.write(response.text)

    # Extract and process balance sheet data
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')
    extracted_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 10:
            funds = cols[2].get_text(strip=True)
            current_period = cols[6].get_text(strip=True)
            values = cols[9].get_text(strip=True)
            if funds and not funds.isspace():
                extracted_data.append([funds, current_period, values])

    # Convert extracted data to DataFrame and write to CSV
    balance_sheet_df = pd.DataFrame(extracted_data, columns=['Funds', 'Current Period', 'Values'])
    balance_sheet_df = balance_sheet_df.iloc[1:]  # Remove header row
    balance_sheet_df.to_csv('BalanceSheet.csv', index=False)

    # Print the DataFrame (optional)
    # print(balance_sheet_df)
    return_list=[
    {'Category': balance_sheet_df.iloc[0]['Funds'],'Values': balance_sheet_df.iloc[0]['Values']}, 
    {'Category': balance_sheet_df.iloc[1]['Funds'],'Values': balance_sheet_df.iloc[1]['Values']},
    {'Category': balance_sheet_df.iloc[2]['Funds'], 'Values':balance_sheet_df.iloc[2]['Values']},
    {'Category':balance_sheet_df.iloc[3]['Funds'], 'Values': balance_sheet_df.iloc[3]['Values']},
    {'Category': balance_sheet_df.iloc[4]['Funds'], 'Values': balance_sheet_df.iloc[4]['Values']},
    {'Category': balance_sheet_df.iloc[5]['Funds'], 'Values': balance_sheet_df.iloc[5]['Values']}, 
    {'Category': balance_sheet_df.iloc[6]['Funds'], 'Values': balance_sheet_df.iloc[6]['Values']}, 
    {'Category': balance_sheet_df.iloc[7]['Funds'], 'Values':balance_sheet_df.iloc[7]['Current Period']},
    {'Category': balance_sheet_df.iloc[8]['Funds'], 'Values': balance_sheet_df.iloc[8]['Values']},
    {'Category': balance_sheet_df.iloc[9]['Funds'], 'Values': balance_sheet_df.iloc[9]['Values']},
    {'Category': balance_sheet_df.iloc[10]['Funds'], 'Values': balance_sheet_df.iloc[10]['Values']},
    {'Category': balance_sheet_df.iloc[11]['Funds'], 'Values': balance_sheet_df.iloc[11]['Values']},
    {'Category': balance_sheet_df.iloc[12]['Funds'], 'Values': balance_sheet_df.iloc[12]['Values']}]
    
    return return_list

def extract_group_summary(from_date:int,to_date:int,grp_name:str)->List[Dict[str,str]]:
    data=f"""<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <EXPORTDATA>
      <REQUESTDESC>
        <STATICVARIABLES>
          <!--Specify the FROM DATE here-->
          <GROUPNAME>{grp_name}</GROUPNAME>
          <SVFROMDATE>{from_date}</SVFROMDATE>
          <!--Specify the TO DATE here-->
          <SVTODATE>{to_date}</SVTODATE>
          <SVEXPORTFORMAT>$$SysName:HTML</SVEXPORTFORMAT>

         </STATICVARIABLES>
        <!--Report Name-->
        <REPORTNAME>Group Summary</REPORTNAME>
      </REQUESTDESC>
    </EXPORTDATA>
  </BODY>
</ENVELOPE>"""
    # Send request to Tally
    url = "http://localhost:9000"
    headers = {"Content-Type": "application/xml"}
    response = requests.request("POST", url, headers=headers, data=data)

    # Write response to file
    specific_filename = "capitalaccount.html"
    result_folder = "C:/Users/jaint/Downloads/dashboard/dashboard/src/components/reports/Tally/Balancesheet"
    result_file = os.path.join(result_folder, specific_filename)
    with open(result_file, "w") as file:
        file.write(response.text)

    # Extract and process balance sheet data
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')
    extracted_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 10:
            Particulars = cols[2].get_text(strip=True)
            Debit = cols[6].get_text(strip=True)
            Credit = cols[9].get_text(strip=True)
            extracted_data.append([Particulars,Debit,Credit])

    # Convert extracted data to DataFrame and write to CSV
    capital_sheet_df = pd.DataFrame(extracted_data, columns=['Particulars', 'Debit', 'Credit'])
    capital_sheet_df = capital_sheet_df.iloc[3:]  # Remove header row
    return_list = []
    for index, row in capital_sheet_df.iterrows():
        entry = {
        'Particulars': row['Particulars'],
        'Debit': row['Debit'],
        'Credit': row['Credit']
    }
        return_list.append(entry)
    return return_list
def extract_ledger_monthly(from_date:int,to_date:int,ledger_name:str)->List[Dict[str,str]]:
    data=f"""<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <EXPORTDATA>
      <REQUESTDESC>
        <STATICVARIABLES>

          <!--Specify the Report FORMAT here-->
          <SVEXPORTFORMAT>$$SysName:HTML</SVEXPORTFORMAT>

          <!-- Show Opening balances -->
          <DSPSHOWOPENING>Yes</DSPSHOWOPENING>

          <!-- Show Dr/Cr totals or only NET balance of Dr/Cr -->
          <DSPSHOWNETT>No</DSPSHOWNETT>
          <DSPSHOWTRANS>Yes</DSPSHOWTRANS>

          <!-- Month,3 Month, 6 Month, 12 Month-->
          <!-- Or specify Day for Daily breakup report-->
          <SVPERIODICITY>Month</SVPERIODICITY>

          <!-- Required for Monthly Summary Report-->
          <DSPSHOWMONTHLY>Yes</DSPSHOWMONTHLY>
          <DSPSHOWALLACCOUNTS>Yes</DSPSHOWALLACCOUNTS>

          <!--Specify the Period here. -->
          <SVFROMDATE>{from_date}</SVFROMDATE>
          <SVTODATE>{to_date}</SVTODATE>

          <!-- Specify the LedgerName here -->
          <LEDGERNAME>{ledger_name}</LEDGERNAME>
        </STATICVARIABLES>

        <!-- Report Name -->
        <REPORTNAME>Ledger Monthly Summary</REPORTNAME>
      </REQUESTDESC>
    </EXPORTDATA>
  </BODY>
</ENVELOPE>"""
 # Send request to Tally
    url = "http://localhost:9000"
    headers = {"Content-Type": "application/xml"}
    response = requests.request("POST", url, headers=headers, data=data)

    # Write response to file
    specific_filename = "ledger.html"
    result_folder = "C:/Users/jaint/Downloads/dashboard/dashboard/src/components/reports/Tally/Balancesheet"
    result_file = os.path.join(result_folder, specific_filename)
    with open(result_file, "w") as file:
        file.write(response.text)

    # Extract and process balance sheet data
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')
    extracted_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 13:
            Particulars = cols[2].get_text(strip=True)
            Debit = cols[6].get_text(strip=True)
            Credit = cols[9].get_text(strip=True)
            Closing_Balance=cols[12].get_text(strip=True)
            extracted_data.append([Particulars,Debit,Credit,Closing_Balance])

    # Convert extracted data to DataFrame and write to CSV
    ledger_sheet_df = pd.DataFrame(extracted_data, columns=['Particulars', 'Debit', 'Credit','ClosingBalance'])
    ledger_sheet_df = ledger_sheet_df.iloc[3:]  # Remove header row
    return_list = []
    for index, row in ledger_sheet_df.iterrows():
        entry = {
        'Particulars': row['Particulars'],
        'Debit': row['Debit'],
        'Credit': row['Credit'],
        'ClosingBalance':row['ClosingBalance']
    }
        return_list.append(entry)
    return return_list

def profit_and_loss(from_date:int,to_date:int)->List[Dict[str,str]]:
    data=f"""<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <EXPORTDATA>
      <REQUESTDESC>
        <STATICVARIABLES>
          <SVEXPORTFORMAT>$$SysName:HTML</SVEXPORTFORMAT>
          
          <!--Specify the FROM DATE here -->
          <SVFROMDATE>{from_date}</SVFROMDATE>
          <!--Specify the TO DATE here -->
          <SVTODATE>{to_date}</SVTODATE>
        </STATICVARIABLES>
        <REPORTNAME>Profit and Loss</REPORTNAME>
      </REQUESTDESC>
    </EXPORTDATA>
  </BODY>
</ENVELOPE>"""
 # Send request to Tally
    url = "http://localhost:9000"
    headers = {"Content-Type": "application/xml"}
    response = requests.request("POST", url, headers=headers, data=data)

    # Write response to file
    specific_filename = "pl.html"
    result_folder = "C:/Users/jaint/Downloads/dashboard/dashboard/src/components/reports/Tally/PL"
    result_file = os.path.join(result_folder, specific_filename)
    with open(result_file, "w") as file:
        file.write(response.text)

    # Extract and process balance sheet data
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')
    extracted_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 10:
            Particulars = cols[2].get_text(strip=True)
            value1 = cols[6].get_text(strip=True)
            value2 = cols[9].get_text(strip=True)
            if Particulars and not Particulars.isspace():
                extracted_data.append([Particulars,value1,value2])

    # Convert extracted data to DataFrame and write to CSV
    pl_sheet_df = pd.DataFrame(extracted_data, columns=['Particulars', 'value1', 'value2'])
    pl_sheet_df = pl_sheet_df.iloc[1:]  # Remove header row
    return_list = []
    for index, row in pl_sheet_df.iterrows():
        entry = {
        'Particulars': row['Particulars'],
        'value1': row['value1'],
        'value2': row['value2']    }
        return_list.append(entry)
    return return_list
def purchase_grp_summary(from_date:int,to_date:int)->List[Dict[str,str]]:
    data=f"""<ENVELOPE>
<HEADER>
<TALLYREQUEST>Export Data</TALLYREQUEST>
</HEADER>
<BODY>
<EXPORTDATA>
<REQUESTDESC>
<STATICVARIABLES>
<!--Specify the Period here-->
<SVFROMDATE>{from_date}</SVFROMDATE>
<SVTODATE>{to_date}</SVTODATE>
<SVEXPORTFORMAT>$$SysName:HTML</SVEXPORTFORMAT>
<!--Specify the GroupName here-->
<GROUPNAME>Purchase Accounts</GROUPNAME>


</STATICVARIABLES>
<!--Report Name-->
<REPORTNAME>Purchase Group Summary</REPORTNAME>
</REQUESTDESC>
</EXPORTDATA>
</BODY>
</ENVELOPE>"""
 # Send request to Tally
    url = "http://localhost:9000"
    headers = {"Content-Type": "application/xml"}
    response = requests.request("POST", url, headers=headers, data=data)

    # Write response to file
    specific_filename = "purchase.html"
    result_folder = "C:/Users/jaint/Downloads/dashboard/dashboard/src/components/reports/Tally/PL"
    result_file = os.path.join(result_folder, specific_filename)
    with open(result_file, "w") as file:
        file.write(response.text)

    # Extract and process balance sheet data
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')
    extracted_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 10:
            Particulars = cols[2].get_text(strip=True)
            Debit = cols[6].get_text(strip=True)
            Credit = cols[9].get_text(strip=True)
            if Particulars and not Particulars.isspace():
                extracted_data.append([Particulars,Debit,Credit])

    # Convert extracted data to DataFrame and write to CSV
    purchase_sheet_df = pd.DataFrame(extracted_data, columns=['Particulars', 'Debit', 'Credit'])
    return_list = []
    for index, row in purchase_sheet_df.iterrows():
        entry = {
        'Particulars': row['Particulars'],
        'Debit': row['Debit'],
        'Credit': row['Credit']    }
        return_list.append(entry)
    return return_list
def stock_grp_summary(from_date:int,to_date:int)->List[Dict[str,str]]:
    data=f"""<ENVELOPE>
<HEADER>
<TALLYREQUEST>Export Data</TALLYREQUEST>
</HEADER>
<BODY>
<EXPORTDATA>
<REQUESTDESC>
<STATICVARIABLES>
<!--Specify the Period here-->
<SVFROMDATE>{from_date}</SVFROMDATE>
<SVTODATE>{to_date}</SVTODATE>
<SVEXPORTFORMAT>$$SysName:HTML</SVEXPORTFORMAT>



</STATICVARIABLES>
<!--Report Name-->
<REPORTNAME>Stock Group Summary</REPORTNAME>
</REQUESTDESC>
</EXPORTDATA>
</BODY>
</ENVELOPE>"""
 # Send request to Tally
    url = "http://localhost:9000"
    headers = {"Content-Type": "application/xml"}
    response = requests.request("POST", url, headers=headers, data=data)

    # Write response to file
    specific_filename = "stockgrpsumm.html"
    result_folder = "C:/Users/jaint/Downloads/dashboard/dashboard/src/components/reports/Tally/PL"
    result_file = os.path.join(result_folder, specific_filename)
    with open(result_file, "w") as file:
        file.write(response.text)

    # Extract and process balance sheet data
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')
    extracted_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 13:
            Particulars = cols[2].get_text(strip=True)
            quantity = cols[6].get_text(strip=True)
            rate = cols[9].get_text(strip=True)
            value = cols[12].get_text(strip=True)
            if Particulars and not Particulars.isspace():
                extracted_data.append([Particulars,quantity,rate,value])

    # Convert extracted data to DataFrame and write to CSV
    stock_sheet_df = pd.DataFrame(extracted_data, columns=['Particulars', 'quantity', 'rate','value'])
    return_list = []
    for index, row in stock_sheet_df.iterrows():
        entry = {
        'Particulars': row['Particulars'],
        'quantity': row['quantity'],
        'rate': row['rate'],
        'value':row['value']}
        return_list.append(entry)
    return return_list

def stock_grp_summary_inside(from_date:int,to_date:int,grp_name:str)->List[Dict[str,str]]:
    data=f"""<ENVELOPE>
              <HEADER>
              <TALLYREQUEST>Export Data</TALLYREQUEST>
              </HEADER>
              <BODY>
              <EXPORTDATA>
              <REQUESTDESC>
              <STATICVARIABLES>
              <!--Specify the Period here-->
              <SVFROMDATE>{from_date}</SVFROMDATE>
              <SVTODATE>{to_date}</SVTODATE>
              <SVEXPORTFORMAT>$$SysName:HTML</SVEXPORTFORMAT>

              <STOCKGROUPNAME>{grp_name}</STOCKGROUPNAME>

              </STATICVARIABLES>
              <!--Report Name-->
              <REPORTNAME>Stock Group Summary</REPORTNAME>
              </REQUESTDESC>
              </EXPORTDATA>
              </BODY>
              </ENVELOPE>"""
 # Send request to Tally
    url = "http://localhost:9000"
    headers = {"Content-Type": "application/xml"}
    response = requests.request("POST", url, headers=headers, data=data)

    # Write response to file
    specific_filename = "stockgrpsumm.html"
    result_folder = "C:/Users/jaint/Downloads/dashboard/dashboard/src/components/reports/Tally/PL"
    result_file = os.path.join(result_folder, specific_filename)
    with open(result_file, "w") as file:
        file.write(response.text)

    # Extract and process balance sheet data
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')
    extracted_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 13:
            Particulars = cols[2].get_text(strip=True)
            quantity = cols[6].get_text(strip=True)
            rate = cols[9].get_text(strip=True)
            value = cols[12].get_text(strip=True)
            if Particulars and not Particulars.isspace():
                extracted_data.append([Particulars,quantity,rate,value])

    # Convert extracted data to DataFrame and write to CSV
    stock_sheetinside_df = pd.DataFrame(extracted_data, columns=['Particulars', 'quantity', 'rate','value'])
    return_list = []
    for index, row in stock_sheetinside_df.iterrows():
        entry = {
        'Particulars': row['Particulars'],
        'quantity': row['quantity'],
        'rate': row['rate'],
        'value':row['value']}
        return_list.append(entry)
    return return_list
def stock_item_monthly_summary(from_date:int,to_date:int,stock_name:str)->List[Dict[str,str]]:
    data=f"""<ENVELOPE>
            <HEADER>
            <TALLYREQUEST>Export Data</TALLYREQUEST>
            </HEADER>
            <BODY>
            <EXPORTDATA>
            <REQUESTDESC>
            <STATICVARIABLES>
            <!--Specify the Period here-->
            <SVFROMDATE>{from_date}</SVFROMDATE>
            <SVTODATE>{to_date}</SVTODATE>
            <!--Specify the StockItem Name here-->
            <STOCKITEMNAME>{stock_name}</STOCKITEMNAME>
            </STATICVARIABLES>
            <!--Specify the Report Name here-->
            <REPORTNAME>ITEMMONTHLYSUMMARY</REPORTNAME>
            </REQUESTDESC>
            </EXPORTDATA>
            </BODY>
            </ENVELOPE>"""
 # Send request to Tally
    url = "http://localhost:9000"
    headers = {"Content-Type": "application/xml"}
    response = requests.request("POST", url, headers=headers, data=data)

    # Write response to file
    specific_filename = "stockitemmonthly.html"
    result_folder = "C:/Users/jaint/Downloads/dashboard/dashboard/src/components/reports/Tally/PL"
    result_file = os.path.join(result_folder, specific_filename)
    with open(result_file, "w") as file:
        file.write(response.text)

    # Extract and process balance sheet data
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')
    extracted_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 22:
             particulars = cols[2].get_text(strip=True)
             quantity1=cols[6].get_text(strip=True)
             value1 = cols[9].get_text(strip=True)
             quantity2=cols[12].get_text(strip=True)
             value2 = cols[15].get_text(strip=True)
             quantity3=cols[18].get_text(strip=True)
             value3 = cols[21].get_text(strip=True)
             if particulars and not particulars.isspace():
                extracted_data.append([particulars,quantity1,value1,quantity2,value2,quantity3,value3])

    # Convert extracted data to DataFrame and write to CSV
    stock_sheetmonthly_df = pd.DataFrame(extracted_data, columns=['Particulars', 'quantity1','value1','quantity2','value2','quantity3','value3'])
    return_list = []
    for index, row in stock_sheetmonthly_df.iterrows():
        entry = {
        'Particulars': row['Particulars'],
        'quantity1': row['quantity1'],
        'value1':row['value1'],
        'quantity2':row['quantity2'],
        'value2':row['value2'],
        'quantity3':row['quantity3'],
        'value3':row['value3']}
        return_list.append(entry)
    return return_list

def opening_stock_summary(from_date:int,to_date:int)->List[Dict[str,str]]:
    data=f"""<ENVELOPE>
              <HEADER>
              <TALLYREQUEST>Export Data</TALLYREQUEST>
              </HEADER>
              <BODY>
              <EXPORTDATA>
              <REQUESTDESC>
              <STATICVARIABLES>
              <!--Specify the Period here-->
              <SVFROMDATE>{from_date}</SVFROMDATE>
              <SVTODATE>{to_date}</SVTODATE>
              <SVEXPORTFORMAT>$$SysName:HTML</SVEXPORTFORMAT>



              </STATICVARIABLES>
              <!--Report Name-->
              <REPORTNAME>Opening Stock Summary</REPORTNAME>
              </REQUESTDESC>
              </EXPORTDATA>
              </BODY>
              </ENVELOPE>"""
 # Send request to Tally
    url = "http://localhost:9000"
    headers = {"Content-Type": "application/xml"}
    response = requests.request("POST", url, headers=headers, data=data)

    # Write response to file
    specific_filename = "opening.html"
    result_folder = "C:/Users/jaint/Downloads/dashboard/dashboard/src/components/reports/Tally/PL"
    result_file = os.path.join(result_folder, specific_filename)
    with open(result_file, "w") as file:
        file.write(response.text)

    # Extract and process balance sheet data
    soup = BeautifulSoup(response.text, 'html.parser')
    rows = soup.find_all('tr')
    extracted_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 13:
            Particulars = cols[2].get_text(strip=True)
            quantity = cols[6].get_text(strip=True)
            rate = cols[9].get_text(strip=True)
            value = cols[12].get_text(strip=True)
            if Particulars and not Particulars.isspace():
                extracted_data.append([Particulars,quantity,rate,value])

    # Convert extracted data to DataFrame and write to CSV
    opening_sheet_df = pd.DataFrame(extracted_data, columns=['Particulars', 'quantity', 'rate','value'])
    return_list = []
    for index, row in opening_sheet_df.iterrows():
        entry = {
        'Particulars': row['Particulars'],
        'quantity': row['quantity'],
        'rate': row['rate'],
        'value':row['value']}
        return_list.append(entry)
    return return_list
@app.get("/balance-sheet/")
async def get_balance_sheet(from_date:int,to_date:int)->List[Dict[str,str]]:
    return generate_and_process_balance_sheet(from_date,to_date)
@app.get("/grpsummary")
async def grpsummary(from_date:int,to_date:int,grp_name:str)->List[Dict[str,str]]:
    return extract_group_summary(from_date,to_date,grp_name)
@app.get("/ledger")
async def ledger_sheet(from_date:int,to_date:int,ledger_name:str)->List[Dict[str,str]]:
    return extract_ledger_monthly(from_date,to_date,ledger_name)
@app.get("/plsheet")
async def pl_sheet(from_date:int,to_date:int)->List[Dict[str,str]]:
    return profit_and_loss(from_date,to_date)
@app.get("/purchasesheet")
async def purchase_sheet(from_date:int,to_date:int)->List[Dict[str,str]]:
    return purchase_grp_summary(from_date,to_date)
@app.get("/stocksheet")
async def stock_sheet(from_date:int,to_date:int)->List[Dict[str,str]]:
    return stock_grp_summary(from_date,to_date)
@app.get("/stocksheetinside")
async def stock_sheet_inside(from_date:int,to_date:int,grp_name:str)->List[Dict[str,str]]:
    return stock_grp_summary_inside(from_date,to_date,grp_name)
@app.get("/stockmonthlysheetinside")
async def stock_monthly_inside(from_date:int,to_date:int,stock_name:str)->List[Dict[str,str]]:
    return stock_item_monthly_summary(from_date,to_date,stock_name)
@app.get("/openingstock")
async def get_opening_stock_summary(from_date:int,to_date:int)->List[Dict[str,str]]:
    return opening_stock_summary(from_date,to_date)