import { useState, useEffect } from 'react';
import { Input, Dropdown } from '.';
import { Accordion } from 'flowbite-react';

const Filters = ({ filters, setFilterQuery }) => {
  const [filtersLocalState, setFiltersLocalState] = useState(filters);

  useEffect(() => {
    const query = filtersLocalState.reduce((acc, curr) => {
      if (curr.value) {
        acc += `filter[${curr.key}]=reg(${curr.options ? curr.value : `${curr.value}`})&`;
      }
      return acc;
    }, '');
    setFilterQuery(query);
  }, [filtersLocalState]);

  const onFilterChange = (e, key) => {
    setFiltersLocalState(
      filtersLocalState.map((filter) => {
        if (filter.key === key) {
          return { ...filter, value: e.target.value };
        }
        return filter;
      }),
    );
  };

  return (
    <div class="w-full mb-4">
      <Accordion alwaysOpen={true} collapseAll>
        <Accordion.Panel className="outline-none focus:ring-0">
          <Accordion.Title>
            <span class="text-2xl text-gray-700 font-semibold">Filters</span>
          </Accordion.Title>
          <Accordion.Content>
            <div class="w-full flex justify-start items-center flex-wrap gap-x-6">
              {filtersLocalState.map((filter, index) => {
                return (
                  <div key={`filter-${filter.key}-${index}`} class="w-full md:w-auto h-full flex flex-col justify-center items-start">
                    <span class="text-md text-black mt-2 mb-1">{filter.label}</span>
                    {filter.options ? (
                      <Dropdown filterkey={filter.key} options={filter.options} className="h-12 sm:h-12" onChange={onFilterChange} />
                    ) : (
                      <Input
                        wrapperclasses="w-full md:w-auto"
                        className="h-12 sm:h-12"
                        value={filter.value}
                        placeholder="Search"
                        onChange={(e) => {
                          onFilterChange(e, filter.key);
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default Filters;
