import logo from "./logo.svg";
import "./App.css";
import Form_cmp from "./components/Form_cmp.js";
import Buttons_cmp from "./components/DropdownMenu.js";
import Table_cmp from "./components/Table_cmp.js";
import Pagination_cmp from "./components/Pagination_cmp.js";

function App() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        {/* Start coding here */}
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <Form_cmp />
          <Pagination_cmp />
        </div>
      </div>
    </section>
  );
}

export default App;
