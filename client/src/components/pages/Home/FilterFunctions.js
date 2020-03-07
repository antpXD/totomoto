import React, { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import HomeCarousel from "./HomeCarousel";
import HomeOfferList from "./HomeOfferList";
import HomeFilters from "./HomeFilters";
import Spinner from "../../layout/Spinner";
import { Parallax } from "react-scroll-parallax";
import OfferContext from "../../../context/offer/offerContext";
import useDebounce from "../../../utils/useDebounceHook";

const FilterFunctions = ({ allOffers }) => {
  const offerContext = useContext(OfferContext);
  const { loading } = offerContext;

  const maxValues = {
    maxPrice: Math.max.apply(
      Math,
      allOffers.map(o => {
        return o.price;
      })
    ),
    maxYear: Math.max.apply(
      Math,
      allOffers.map(o => {
        return o.year;
      })
    ),
    maxMileage: Math.max.apply(
      Math,
      allOffers.map(o => {
        return o.mileage;
      })
    ),
    maxEngineSize: Math.max.apply(
      Math,
      allOffers.map(o => {
        return o.engineSize;
      })
    ),
    maxEnginePower: Math.max.apply(
      Math,
      allOffers.map(o => {
        return o.enginePower;
      })
    )
  };

  const minValues = {
    minPrice: Math.min.apply(
      Math,
      allOffers.map(o => {
        return o.price;
      })
    ),
    minYear: Math.min.apply(
      Math,
      allOffers.map(o => {
        return o.year;
      })
    ),
    minMileage: Math.min.apply(
      Math,
      allOffers.map(o => {
        return o.mileage;
      })
    ),
    minEngineSize: Math.min.apply(
      Math,
      allOffers.map(o => {
        return o.engineSize;
      })
    ),
    minEnginePower: Math.min.apply(
      Math,
      allOffers.map(o => {
        return o.enginePower;
      })
    )
  };

  const INITIAL_STATE = {
    search: {
      make: "",
      model: ""
    },
    bodyType: {
      car: false,
      motorcycle: false,
      truck: false,
      van: false
    },
    condition: {
      new: false,
      used: false,
      damaged: false
    },
    fuelType: {
      petrol: false,
      diesel: false,
      electric: false,
      hybrid: false
    },
    price: [0, maxValues.maxPrice],
    year: [0, maxValues.maxYear],
    mileage: [0, maxValues.maxMileage],
    engineSize: [0, maxValues.maxEngineSize],
    enginePower: [0, maxValues.maxEnginePower]
    // error: null
  };

  const [criteria, setCriteria] = useState(INITIAL_STATE);
  const { enginePower, engineSize, year, mileage, price, search } = criteria;

  const debounced = useDebounce(
    { enginePower, engineSize, year, mileage, price, search },
    500
  );

  //Handling filtering from different inputs
  const handleInputFilter = (filterProp, name) => e => {
    setCriteria({
      ...criteria,
      [filterProp]: {
        ...criteria[filterProp],
        [name]: e.target.value
      }
    });
  };
  const handleCheckboxFilter = (filterProp, name) => e => {
    setCriteria({
      ...criteria,
      [filterProp]: {
        ...criteria[filterProp],
        [name]: e.target.checked
      }
    });
  };

  //handling slider with input
  const handleSliderFilter = name => (event, newValue) => {
    event.preventDefault();
    setCriteria({
      ...criteria,
      [name]: newValue
    });
  };
  const handleSliderInputMin = name => event => {
    setCriteria({
      ...criteria,
      [name]: [
        event.target.value === "" ? "" : Number(event.target.value),
        criteria[name][1]
      ]
    });
  };
  const handleSliderInputMax = name => event => {
    setCriteria({
      ...criteria,
      [name]: [
        criteria[name][0],
        event.target.value === "" ? "" : Number(event.target.value)
      ]
    });
  };
  const handleSliderBlur = name => {
    if (criteria[name][0] < 0) {
      setCriteria({
        ...criteria,
        [name]: [0, criteria[name][1]]
      });
    }
  };

  // collects ALL keys that have true as a value, then create a new obj to compare to filter.
  const collectedCriteria = () => {
    const collectedTrueKeys = {
      bodyType: [],
      condition: [],
      fuelType: []
    };

    const { bodyType, condition, fuelType } = criteria;
    for (let bodyTypeKey in bodyType) {
      if (bodyType[bodyTypeKey]) collectedTrueKeys.bodyType.push(bodyTypeKey);
    }
    for (let conditionKey in condition) {
      if (condition[conditionKey])
        collectedTrueKeys.condition.push(conditionKey);
    }
    for (let fuelTypeKey in fuelType) {
      if (fuelType[fuelTypeKey]) collectedTrueKeys.fuelType.push(fuelTypeKey);
    }
    return collectedTrueKeys;
  };

  const multiPropsFilter = (allOffers, filters) => {
    const getValue = value =>
      typeof value === "string" ? value.toLowerCase() : value;

    const filterKeys = Object.keys(filters);

    return allOffers.filter(offer => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores an empty filter
        if (!filters[key].length) return true;
        return filters[key].find(
          filter => getValue(filter) === getValue(offer[key])
        );
      });
    });
  };

  const searchOffers = () => {
    const filteredOffers = multiPropsFilter(allOffers, collectedCriteria());

    return filteredOffers.filter(offer => {
      return (
        offer.make
          .toLowerCase()
          .includes(debounced.search.make.toLowerCase()) &&
        offer.model
          .toLowerCase()
          .includes(debounced.search.model.toLowerCase()) &&
        offer.price >= debounced.price[0] &&
        offer.price <= debounced.price[1] &&
        offer.year >= debounced.year[0] &&
        offer.year <= debounced.year[1] &&
        offer.mileage >= debounced.mileage[0] &&
        offer.mileage <= debounced.mileage[1] &&
        offer.engineSize >= debounced.engineSize[0] &&
        offer.engineSize <= debounced.engineSize[1] &&
        offer.enginePower >= debounced.enginePower[0] &&
        offer.enginePower <= debounced.enginePower[1]
      );
    });
  };

  return (
    <>
      {allOffers !== null && !loading ? (
        <div className="hero-section">
          <HomeCarousel offers={allOffers} />
        </div>
      ) : (
        <Spinner />
      )}
      <Parallax className="custom-class" y={[-200, 200]} tagOuter="figure">
        <CSSTransition
          in={true}
          appear={true}
          timeout={800}
          classNames="slideOut"
        >
          <div className="round-container round-container--hero">
            <div className="container">
              <div className="grid-px">
                <div className="left-panel">
                  <HomeFilters
                    handleCheckboxFilter={handleCheckboxFilter}
                    handleInputFilter={handleInputFilter}
                    handleSliderFilter={handleSliderFilter}
                    handleSliderInputMin={handleSliderInputMin}
                    handleSliderInputMax={handleSliderInputMax}
                    handleSliderBlur={handleSliderBlur}
                    criteria={criteria}
                    maxValues={maxValues}
                    minValues={minValues}
                  />
                </div>

                <div className="right-panel">
                  <div className="flex-row">
                    <h1 className="section-title p-bottom__24">
                      <span className="text-light">All</span>
                      <span className="text-dark">offers</span>
                    </h1>
                  </div>
                  {allOffers !== null && searchOffers !== null && !loading ? (
                    <>
                      <HomeOfferList filteredOffers={searchOffers()} />
                    </>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </Parallax>
    </>
  );
};

export default FilterFunctions;
