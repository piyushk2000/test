import "./client-profile-inflow.scss";
import { MonthHeaderInflowData, monthData } from "./helper";
import Plus from "../../../assets/images/client/plus.png";
import Minus from "../../../assets/images/client/minus.png"

const ClientContactProfileInflow = () => {
  return (
    <>
      <section className="client-profile-inflow-section">
        <div className="inflow-header">
          <p>Inflow</p>
          <p>2022</p>
        </div>
        <div className="inflow-section-data">
          <div className="table-header-section">
            <p className="domain">Domain</p>
            {MonthHeaderInflowData.map((data) => {
              return (
                <div className="month">
                  <p className="month-name" >{data.Month_Name}</p>
                  <div className="month-header-data">
                    <p className="data1" >{data.Data1}</p>
                    <p className="data2" >{data.Data2}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {monthData.map((data) => {
            return (
              <div className="month-data">
                <div className="domain-data" >
                  <p>{data.Domain_Name}</p>
                  {data.isIconAdd && <img src={Plus} className="domain-image" alt="" />}
                  {data.isIconSub && <img src={Minus} className="domain-image" alt="" />}
                </div>
                <div className="data" >
                  <p>{data.Jan_Data[0]}</p>
                  <p>{data.Jan_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.Feb_Data[0]}</p>
                  <p>{data.Feb_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.March_Data[0]}</p>
                  <p>{data.March_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.Apr_Data[0]}</p>
                  <p>{data.Apr_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.May_Data[0]}</p>
                  <p>{data.May_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.Jun_Data[0]}</p>
                  <p>{data.Jun_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.Jul_Data[0]}</p>
                  <p>{data.Jul_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.Aug_Data[0]}</p>
                  <p>{data.Aug_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.Sep_Data[0]}</p>
                  <p>{data.Sep_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.Oct_Data[0]}</p>
                  <p>{data.Oct_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.Nov_Data[0]}</p>
                  <p>{data.Nov_Data[1]}</p>
                </div>
                <div className="data" >
                  <p>{data.Dec_Data[0]}</p>
                  <p>{data.Dec_Data[1]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ClientContactProfileInflow;
