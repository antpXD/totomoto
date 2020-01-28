import React, { useContext, useEffect, useState } from "react";
import HomeCarousel from "./HomeCarousel";
import HomeOfferList from "./HomeOfferList";
import HomeFilters from "./HomeFilters";
import Navbar from "../../layout/Navbar";
import Spinner from "../../layout/Spinner";

import OfferContext from "../../../context/offer/offerContext";

import useDebounce from "../../../utils/useDebounceHook";

const FilterFunctions = ({ allOffers }) => {
  const offerContext = useContext(OfferContext);
  const { loading } = offerContext;

  // useEffect(() => {
  //   getAllOffers();
  //   authContext.loadUser();

  //   //eslint-disable-next-line
  // }, []);

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

  const [passingTags, setPassingTags] = useState(INITIAL_STATE);
  const { enginePower, engineSize, year, mileage, price } = passingTags;

  const debounced = useDebounce(
    { enginePower, engineSize, year, mileage, price },
    500
  );

  //Handling filtering from different inputs
  const handleInputFilter = (filterProp, name) => e => {
    setPassingTags({
      ...passingTags,
      [filterProp]: {
        ...passingTags[filterProp],
        [name]: e.target.value
      }
    });
  };
  const handleCheckboxFilter = (filterProp, name) => e => {
    setPassingTags({
      ...passingTags,
      [filterProp]: {
        ...passingTags[filterProp],
        [name]: e.target.checked
      }
    });
  };

  //handling slider with input
  const handleSliderFilter = name => (event, newValue) => {
    event.preventDefault();
    setPassingTags({
      ...passingTags,
      [name]: newValue
    });
  };
  const handleSliderInputMin = name => event => {
    setPassingTags({
      ...passingTags,
      [name]: [
        event.target.value === "" ? "" : Number(event.target.value),
        passingTags[name][1]
      ]
    });
  };
  const handleSliderInputMax = name => event => {
    setPassingTags({
      ...passingTags,
      [name]: [
        passingTags[name][0],
        event.target.value === "" ? "" : Number(event.target.value)
      ]
    });
  };
  const handleSliderBlur = name => {
    console.log();
    if (passingTags[name][0] < 0) {
      setPassingTags({
        ...passingTags,
        [name]: [0, passingTags[name][1]]
      });
    }
  };

  //actuall filtering
  const filteredCollected = () => {
    const collectedTrueKeys = {
      bodyType: [],
      condition: [],
      fuelType: []
    };

    const { bodyType, condition, fuelType } = passingTags;
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
    const filteredOffers = multiPropsFilter(allOffers, filteredCollected());

    return filteredOffers.filter(offer => {
      return (
        offer.make
          .toLowerCase()
          .includes(passingTags.search.make.toLowerCase()) &&
        offer.model
          .toLowerCase()
          .includes(passingTags.search.model.toLowerCase()) &&
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

  // displays filtered offers
  useEffect(() => {
    allOffers && searchOffers();
    // eslint-disable-next-line
  }, [passingTags]);

  return (
    <>
      <Navbar />
      <div className="container">
        {allOffers !== null && !loading ? (
          <div className="hero-gallery">
            <HomeCarousel offers={allOffers} />
          </div>
        ) : (
          <Spinner />
        )}
        <div className="grid-2 grid-px">
          <div className="left-panel__container">
            <HomeFilters
              handleCheckboxFilter={handleCheckboxFilter}
              handleInputFilter={handleInputFilter}
              handleSliderFilter={handleSliderFilter}
              handleSliderInputMin={handleSliderInputMin}
              handleSliderInputMax={handleSliderInputMax}
              handleSliderBlur={handleSliderBlur}
              passingTags={passingTags}
              maxValues={maxValues}
            />
          </div>
          <div className="right-panel__container">
            <div className="flex-row">
              <h1 className="section-title">
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
    </>
  );
};

export default FilterFunctions;
