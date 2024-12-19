import { useEffect, useState } from "react";
import StockFilter from "../modules/StockManage/StockFilter";
import StockList from "../modules/StockManage/StockList";
import StockMatrix from "../modules/StockManage/StockMatrix";
import env from "../env";
import errortrans from "../translate/error";
import Paging from "../modules/Components/Paging";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function StockManage(props) {
  const token = cookies.get(env.cookieName);

  const direction = props.lang ? props.lang.dir : errortrans.defaultDir;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;

  const [error, setError] = useState({ errorText: "", errorColor: "brown" });

  const [filters, setFilters] = useState(getFiltersFromUrl());

  const [stockList, setStockList] = useState();
  useEffect(() => {
    setStockList();
    const body = {
      // offset:filters.offset?filters.offset:"0",
      offset: filters.offset || "0",
      // pageSize:filters.pageSize?filters.pageSize:"10",
      pageSize: filters.pageSize || "10",
    };
    var postOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...filters /*
      brand:"LECO",material:"Clear 2/2",coating:"HMC",
    lenzIndex:"1.56", sph:"+4.00",cyl:"+2.00"*/,
      }),
    };

    fetch(env.siteApi + "/panel/lens/stock-list", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setError({ errorText: result.error, errorColor: "brown" });
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              3000
            );
          } else {
            setError({ errorText: "سرویس پیدا شد", errorColor: "green" });
            setStockList(result);
            setTimeout(
              () => setError({ errorText: "", errorColor: "brown" }),
              2000
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, [filters]);

  // Function to get filters from URL
  function getFiltersFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      filters[key] = value;
    }
    return filters;
  }

  function updateUrlWithFilters(newFilters) {
    const searchParams = new URLSearchParams(window.location.search);
    for (const key in newFilters) {
      if (newFilters[key]) {
        searchParams.set(key, newFilters[key]);
      } else {
        searchParams.delete(key); // Remove the parameter if the value is falsy
      }
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }

  // Function to handle filter changes
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
    updateUrlWithFilters(newFilters);
  }

  return (
    <main
      className="main-content position-relative h-100 border-radius-lg "
      /*style={{direction:direction}}*/
    >
      <div className="matrix">
        <StockFilter
          lang={lang}
          direction={direction}
          content={stockList}
          setFilters={handleFilterChange}
          currentFilters={filters}
          filters={filters}
          updateUrlWithFilters={updateUrlWithFilters} // Pass the function as a prop
        />
        <StockMatrix
          lang={lang}
          setFilters={setFilters}
          direction={direction}
          content={stockList}
        />
      </div>
      <StockList content={stockList} lang={lang} direction={direction} />
      <Paging
        content={stockList}
        setFilters={setFilters}
        filters={filters}
        lang={props.lang}
      />
    </main>
  );
}
export default StockManage;
