import StyleSelect from "../../components/Button/AutoComplete";
import formtrans from "../../translate/forms";
import ExportBarCode from "./StockModules/ExportBarCode";

function StockFilter(props) {
  const filters = props.content && props.content;

  const handleFilterChange = (property, value) => {
    const newValue = value ? (value._id ? value._id : value) : "";
    props.setFilters((prevState) => ({
      ...prevState,
      [property]: newValue,
    }));
    // Update URL here
    props.updateUrlWithFilters({ ...props.currentFilters, [property]: newValue });
  };

  return (
    <div className="filter-holder">
      <div className="filter-wrapper">
        <h3>{formtrans.filters[props.lang]}</h3>
        <div className="filter-input">
          <StyleSelect
            title={formtrans.brand[props.lang]}
            direction={props.direction}
            //defaultValue={content?content.brandCode:''} class={"formInput"}
            options={(filters && filters.brandList) || []}
            class="matrixFilter"
            action={(e) => handleFilterChange("brand", e)}
          />
        </div>
        <div className="filter-input">
          <StyleSelect
            title={formtrans.lenzIndex[props.lang]}
            direction={props.direction}
            //defaultValue={content?content.brandCode:''} class={"formInput"}
            options={(filters && filters.lenzIndexList) || []}
            class="matrixFilter"
            action={(e) => handleFilterChange("lenzIndex", e)}

          />
        </div>
        <div className="filter-input">
          <StyleSelect
            title={formtrans.material[props.lang]}
            direction={props.direction}
            //defaultValue={content?content.brandCode:''} class={"formInput"}
            options={(filters && filters.materialList) || []}
            class="matrixFilter"
            action={(e) => handleFilterChange("material", e)}

          />
        </div>
        <div className="filter-input">
          <StyleSelect
            title={formtrans.coating[props.lang]}
            direction={props.direction}
            //defaultValue={content?content.brandCode:''} class={"formInput"}
            options={(filters && filters.coatingList) || []}
            class="matrixFilter"
            action={(e) => handleFilterChange("coating", e)}
          />
        </div>
        <div className="filter-input">
          <StyleSelect
            title={formtrans.sph[props.lang]}
            direction={props.direction}
            //defaultValue={content?content.brandCode:''} class={"formInput"}
            options={["+6.00", "+4.00", "+2.00", "-2.00", "-4.00", "-6.00"]}
            class="matrixFilter"
            action={(e) => handleFilterChange("sph", e)}

          />
        </div>
        <div className="filter-input">
          <StyleSelect
            title={formtrans.cyl[props.lang]}
            direction={props.direction}
            //defaultValue={content?content.brandCode:''} class={"formInput"}
            options={["+6.00", "+4.00", "+2.00", "-2.00", "-4.00", "-6.00"]}
            class="matrixFilter"
            action={(e) => handleFilterChange("cyl", e)}
          />
        </div>
      </div>
      {filters &&
      filters.in &&
      filters.in.brand &&
      filters.in.lenzIndex &&
      filters.in.material ? (
        <ExportBarCode lang={props.lang} data={filters} />
      ) : (
        <></>
      )}
    </div>
  );
}
export default StockFilter;
