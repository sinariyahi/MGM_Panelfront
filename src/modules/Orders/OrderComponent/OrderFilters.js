import StyleInput from "../../../components/Button/Input";
import StyleSelect from "../../../components/Button/AutoComplete";
import StyleDatePicker from "../../../components/Button/DatePicker";
import tabletrans from "../../../translate/tables";
import { useState } from "react";

function OrderFilters(props) {
  const category = props.filters && props.filters.category;

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
// const orderNoAction = createConditionalAction("orderNo", 7);

  return (
    <div className="user-filter">
      <div className="serach-input">
        <StyleInput
          title={tabletrans.order[props.lang.lang]}
          direction={props.lang.dir}
          action={createConditionalAction("orderNo", 7)} // Remove the parentheses here

        />
        <StyleSelect
          title={tabletrans.brand[props.lang.lang]}
          direction={props.lang.dir}
          options={props.options}
          action={(e) => handleFilterChange("brand", e)}
        />
        <StyleSelect
          title={tabletrans.express[props.lang.lang]}
          label="label"
          direction={props.lang.dir}
          options={[{label:"فوری",value:"1"},{label:"معمولی",value:"2"}]}
          action={(e) => handleFilterChange("expressPrice", e?e.value:"")}
        />
        <StyleInput
          title={tabletrans.customer[props.lang.lang]}
          direction={props.lang.dir}
          action={(e) => handleFilterChange("customer", e)}

        />

        
          <StyleSelect
            title={"گارانتی"}
            direction={props.lang.dir}
            options={["دارد", "ندارد"]}
            // action={(e) =>
            //   props.setFilters((prevState) => ({
            //     ...prevState,
            //     gurantee: e,
            //   }))
            // }
            action={(e) => handleFilterChange("gurantee", e)}

          />
        
        <StyleDatePicker
          title={tabletrans.selectDate[props.lang.lang]}
          class="filterComponent"
          direction={props.lang.dir}
          local={props.lang.dir === "ltr" ? "en" : "fa"}
          action={(e) =>
            handleFilterChange("date",e)}
          />

      </div>
    </div>
  );
}
export default OrderFilters;
