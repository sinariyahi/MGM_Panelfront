import StyleInput from "../../../components/Button/Input";
import StyleSelect from "../../../components/Button/AutoComplete";
import StyleDatePicker from "../../../components/Button/DatePicker";
import tabletrans from "../../../translate/tables";
import { useState } from "react";
import { serviceKind } from "../../../translate/status";

function ServiceFilters(props) {
  const handleFilterChange = (property, value) => {
    const newValue = value ? (value._id ? value._id : value) : "";
    props.setFilters((prevState) => ({
      ...prevState,
      [property]: newValue,
    }));
    // Update URL here
    props.updateUrlWithFilters({
      ...props.currentFilters,
      [property]: newValue,
    });
  };

  // Define the conditional action
  const createConditionalAction = (property, minLength) => {
    return (e) => {
      if (e.length > minLength || e.length === 0) {
        handleFilterChange(property, e);
      }
    };
  };
  return (
    <div className="user-filter">
      <div className="serach-input">
        <StyleSelect
          title={tabletrans.type[props.lang.lang]}
          direction={props.lang.dir}
          options={serviceKind}
          label={props.lang.lang}
          action={(e) =>
            props.setFilters((prevState) => ({
              ...prevState,
              category: e ? e.english : "",
            }))
          }
        />
        <StyleInput
          title={tabletrans.title[props.lang.lang]}
          direction={props.lang.dir}
          action={(e) => handleFilterChange("title", e)}
        />

        <i className="tableIcon fas fa-ellipsis-v"></i>
      </div>
      <div className="option-sub">
        <div className="option">
          <i className="fa-solid fa-print fa-sm"></i>
          <p>Print</p>
        </div>
        <div className="option">
          <i className="fa-solid fa-file-import fa-sm"></i>
          <p>Import</p>
        </div>
        <div className="option">
          <i className="fa-solid fa-file-export fa-sm"></i>
          <p>Export</p>
        </div>
      </div>
    </div>
  );
}
export default ServiceFilters;
