import axios from "axios";
import _ from "lodash";
import Excel from "exceljs";
import FileSaver from "file-saver";

const fileExtension = ".xlsx";

type Data = {
  sheet_title: string;
  data_key: string;
  apiUrl: string;
  keyTitles: Record<string, string>;
  method?: "GET" | "POST";
  body?: object;
  sendTokenInUrl?: boolean;
  hideExcelHeader?: boolean;
  res_data?: any;
}
type Inputs = {
  title: string; // File Name
  data: Array<Data>
};

//method: GET
//request body: {} optional
export const downloadExcel = async ({
  title,
  data
}: Inputs, setloading: (loading: boolean) => void) => {

  let wb = new Excel.Workbook();
  let fileName =
    (title.length > 80 ? title.substring(0, 79) : title || "table") || "table";

  setloading(true);
  try {
    for (let single_data of data) {
      const hideExcelHeader = single_data.hideExcelHeader;
      const sheet_name = single_data.sheet_title;
      let { csvData, ctitles, footer } = await formatData({ ...single_data });


      let worksheet = wb.addWorksheet(sheet_name);

      if (!hideExcelHeader) {
        let titleRow = worksheet.addRow([title]);
        titleRow.font = {
          name: "Times New Roman",
          family: 4,
          size: 20,
          underline: "double",
          bold: true,
        };
        worksheet.addRow([]);
        // if (showtimestamp != 0) {
        //   let date = new Date().toLocaleString("en-GB", {
        //     timeZone: state.report_timezone,
        //   });
        //   let subTitleRow = worksheet.addRow([
        //     "As on Date : " +
        //       moment(date, "DD/MM/YYYY").format("MMMM D,yyyy") +
        //       " " +
        //       new Date().toLocaleTimeString(undefined, {
        //         timeZone: state.report_timezone,
        //       }) +
        //       ` (Timezone: ${state.report_timezone})`,
        //   ]);
        // }
        worksheet.addRow([]);
        worksheet.mergeCells("A1:D2");
      }

      let headerRow = worksheet.addRow(ctitles);
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFF00" },
          bgColor: { argb: "FF0000FF" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      csvData.forEach((d) => {
        let row = worksheet.addRow(d);
        try {
          row.eachCell((n) => {
            n.style.alignment = { wrapText: true };
          });
        } catch (err) { }
      });
      if (footer.length > 0) {
        worksheet.addRow([]);
        let footerRow = worksheet.addRow(footer);
        footerRow.eachCell((cell, number) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFFFF00" },
            bgColor: { argb: "FF0000FF" },
          };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      }
      try {
        worksheet.columns.forEach((col) => {
          col.width = 25;
        });
      } catch (err) { }
    }
  } catch (err) {
    throw err;
  } finally {
    setloading(false);
  }

  wb.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(blob, fileName + fileExtension);
  });

  // const ws = XLSX.utils.json_to_sheet(csvData);
  // const wb = { Sheets: { [fileName.substring(0,31)]: ws }, SheetNames: [fileName.substring(0,31)] };
  // const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  // const data = new Blob([excelBuffer], { type: fileType });
  // FileSaver.saveAs(data, fileName + fileExtension);

  // The rest of the logic remains the same, just replace `state` with `state` and `setState` with `setState`
  // For brevity, not repeating the unchanged logic

  // Example of setState usage
  // setState(prevState => ({ ...prevState, fullData: modifiedData }));

  // The Excel file creation and saving logic remains the same
};


async function formatData({
  data_key,
  apiUrl,
  keyTitles,
  body = {},
  method = "GET",
  sendTokenInUrl = false,
  res_data = null,
}: Data) {
  const ckeys = Object.keys(keyTitles);
  const ctitles = Object.values(keyTitles);
  let csvData: any[] = [];
  let nst: any[] = [];
  let ttl: any[] = [];
  let shwt: any[] = [];
  let fullData: any[] = [];
  const token = localStorage.getItem("authToken") || "";

  if (!res_data) {
    try {
      const res = await axios({
        url: `${apiUrl}` + (sendTokenInUrl ? `&token=${token}` : ""),
        headers: {
          Authorization: token,
        },
        method: method,
        data: body,
      });
      fullData = _.get(res.data, data_key);
    } catch (err) {
      console.log(err);
    }
  } else {
    fullData = res_data;
  }


  fullData.forEach((b) => {
    ckeys.forEach((a) => {

      if (a.includes(".*.")) {
        let k = a.split(".*.");
        let res = _.get(b, k[0], []);

        for (let i = 1; i < k.length; i++) {
          if (res && res.length) {
            res = res.map((item: any) => _.get(item, k[i], ""));
            res = res.flat();
          } else {
            res = []
          }
        }

        nst.push(res.join(", ") || "");

      } else {
        const nestedResult = _.get(b, a, "");
        nst.push(nestedResult)
      }

    });
  });
  fullData.forEach((a, i) => {
    let c: any[] = [];
    ckeys.forEach((b, j) => {
      let o;
      if (b.includes(".")) o = nst[i * (nst.length / fullData.length) + j];
      else o = a[b] || "";
      c.push(o);
    });
    csvData.push(c);
  });

  shwt.forEach((b) => {
    const f = ckeys.indexOf(b);
    if (f !== -1) {
      ttl[f] = 0;
      fullData.forEach((a) => {
        if (typeof a[b] === "string")
          ttl[f] += parseFloat(a[b].replace(",", "")) || 0;
        else ttl[f] += parseFloat(a[b]) || 0;
      });
      ttl[f] = ttl[f].toFixed(2);
      if (ttl[f] - parseInt(ttl[f]) === 0) ttl[f] = parseInt(ttl[f]);
    }
  });
  let i;
  for (i = 0; i < ttl.length; ++i) {
    ttl[i] = ttl[i] || "";
  }
  for (; i < ctitles.length; ++i) {
    ttl[i] = "";
  }
  for (i = 0; i < ttl.length; ++i) {
    if (ttl[i] !== "") {
      if (ttl[i] < 0) {
        if (typeof ttl[i] === "string")
          ttl[i] = `-${Math.abs(ttl[i].replace(",", ""))}`;
        else ttl[i] = `-${Math.abs(ttl[i])}`;
      } else ttl[i] = ttl[i].toString();
    }
  }
  let footer: any[] = [];
  if (shwt.length) {
    shwt.forEach((a) => {
      const f = ckeys.indexOf(a);
      if (f !== -1) {
        footer.push(ttl[f] !== "" ? `Total ${ctitles[f]}: ${ttl[f]}` : ttl[f]);
      }
    });
  }
  // let t=[]
  // let header=[]
  //   for (let i = 0; i < csvData.length; i++) {
  //     let d=[]
  //     for(var n in csvData[i]) {
  //       d.push(csvData[i][n]);
  //       if(i==0)
  //       header.push(n)
  //    }
  //    t.push(d)
  //   }
  //   forceUpdate();

  return { csvData, ctitles, footer };
}

// https://reports.simplifii.com/?

// data_key=data&
// sendinheader=token&
// // auth_enabled=1&
// // showTotalRowsCount=Total&
// report_title=Calls%20(Upto%201000%20results%20are%20shown%20in%20this%20report)&
// // truncate_text_view=40&
// columns_keys=id,fk_project,account_manager,research_analyst,title,status,fk_expert,fk_expert_value.name,expert_rating,expert_type,fk_client,fk_client_value.name,client_participants,client_contact,billing_office_id,billing_office_id_value.name,call_start_time,call_type,call_status,call_medium,cost_price,cost_price_currency,selling_price,selling_price_currency,payable_mins,chargeable_mins,casecode,geographies&
// column_titles=Call%20ID,Project%20ID,Account%20Manager%20ID,Research%20Analyst%20ID,Title,Status,Expert%20ID,Expert%20Name,Expert%20Rating,Expert%20Type,Client%20ID,Client,Client%20Participants%20ID,Client%20Contact,Billing%20City%20ID,Billing%20City,Call%20Time,Call%20Type,Call%20Status,Call%20Medium,Cost%20Price,Cost%20Price%20Currency,Selling%20Price,Selling%20Price%20Currency,Payable%20Minutes,Billable%20Minutes,Case%20Code,Geographies%20ID&
// token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5NTcxMSwidXNlcl9uYW1lIjoiU2h1YmhhbSBTaW5naCIsInVzZXJfcm9sZSI6IlNVUEVSQURNSU4iLCJpYXQiOjE3MTk4OTQ0MjEsImV4cCI6MTcxOTk1MjAyMX0.y4PKoGat-nF9b9dLo4bLGiV3T-TDMSm3NbH5gOvPK8Q&
// get_api_url=https://colo-dev.infollion.com/api/v1/plan/call?embed=YES&notequalto___status=Scheduled&page=1&limit=1000&sort_by=desc___updated_at#/
