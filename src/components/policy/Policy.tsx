import React from "react";
import policy, { PolicyProps } from "../../assets/fake-data/policy";

function PolicyCard(item: PolicyProps) {
  return (
    <div className="policy__card">
      <div className="policy__card-icon">{item.icon}</div>
      <div className="policy__card-info">
        <div className="name">{item.name}</div>
        <div className="des">{item.description}</div>
      </div>
    </div>
  );
}

export default function Policy() {
  return (
    <div className="policy container" style={{ marginBottom: "50px" }}>
      <div className="row">
        {policy.map((item: PolicyProps, index: number) => {
          return (
            <div className="col-3 col-md-6 col-sm-12" key={index}>
              <PolicyCard icon={item.icon} name={item.name} description={item.description} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
