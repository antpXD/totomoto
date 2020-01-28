import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  TextField,
  Slider,
  FormGroup,
  Checkbox,
  FormControlLabel,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles,
  Input
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: theme.spacing(2)
  },
  marginTopLeft: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    minWidth: 120
  },
  marginTopRight: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    minWidth: 120
  },
  error: {
    background: theme.palette.error.main
  }
}));

function valuetext(value) {
  return `${value}`;
}

//main component
const HomeFilters = ({
  passingTags,
  handleCheckboxFilter,
  handleInputFilter,
  handleSliderFilter,
  handleSliderInputMin,
  handleSliderInputMax,
  handleSliderBlur,
  maxValues
}) => {
  //destructuring passingTags
  const {
    search,
    bodyType,
    condition,
    fuelType,
    price,
    year,
    mileage,
    engineSize,
    enginePower
  } = passingTags;

  const {
    maxPrice,
    maxYear,
    maxEnginePower,
    maxEngineSize,
    maxMileage
  } = maxValues;

  const classes = useStyles();

  return (
    <div>
      <h1 className="section-title">Search</h1>

      <div className="flex-row p-bottom__16">
        <TextField
          variant="outlined"
          name="make"
          value={search.make}
          label="Make"
          onChange={handleInputFilter("search", "make")}
          className={classes.marginTopRight}
          fullWidth={false}
        />
        <TextField
          variant="outlined"
          name="model"
          value={search.model}
          label="Model"
          onChange={handleInputFilter("search", "model")}
          className={classes.marginTopLeft}
          fullWidth={false}
        />
      </div>

      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Body type</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={bodyType.car}
                  onChange={handleCheckboxFilter("bodyType", "car")}
                  value="car"
                  color="primary"
                />
              }
              label="Car"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={bodyType.motorcycle}
                  onChange={handleCheckboxFilter("bodyType", "motorcycle")}
                  value="motorcycle"
                  color="primary"
                  disableRipple
                />
              }
              className={classes.marginTop}
              label="Motorcycle"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={bodyType.truck}
                  onChange={handleCheckboxFilter("bodyType", "truck")}
                  value="truck"
                  color="primary"
                />
              }
              className={classes.marginTop}
              label="Truck"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={bodyType.van}
                  onChange={handleCheckboxFilter("bodyType", "van")}
                  value="van"
                  color="primary"
                />
              }
              className={classes.marginTop}
              label="Van"
              labelPlacement="end"
            />
          </FormGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Price</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Input
            name="price"
            value={price[0]}
            margin="dense"
            onChange={handleSliderInputMin("price")}
            onBlur={handleSliderBlur("price")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxPrice },
              type: "number",
              "aria-labelledby": "price-slider"
            }}
            disableUnderline
          />
          <Slider
            color="secondary"
            name="price"
            value={price}
            onChange={handleSliderFilter("price")}
            valueLabelDisplay="auto"
            aria-labelledby="price-slider"
            getAriaValueText={valuetext}
          />
          <Input
            name="price"
            value={price[1]}
            margin="dense"
            onChange={handleSliderInputMax("price")}
            onBlur={handleSliderBlur("price")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxPrice },
              type: "number",
              "aria-labelledby": "price-slider"
            }}
            disableUnderline
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <h3>Condition</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={condition.new}
                  onChange={handleCheckboxFilter("condition", "new")}
                  value="new"
                  color="primary"
                />
              }
              label="New"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={condition.used}
                  onChange={handleCheckboxFilter("condition", "used")}
                  value="used"
                  color="primary"
                />
              }
              className={classes.marginTop}
              label="Used"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={condition.damaged}
                  onChange={handleCheckboxFilter("condition", "damaged")}
                  value="damaged"
                  color="primary"
                />
              }
              className={classes.marginTop}
              label="Damaged"
              labelPlacement="end"
            />
          </FormGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Year</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Input
            name="year"
            value={year[0]}
            margin="dense"
            onChange={handleSliderInputMin("year")}
            onBlur={handleSliderBlur("year")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxYear },
              type: "number",
              "aria-labelledby": "year-slider"
            }}
            disableUnderline
          />
          <Slider
            color="secondary"
            name="year"
            value={year}
            onChange={handleSliderFilter("year")}
            valueLabelDisplay="auto"
            aria-labelledby="year-slider"
            getAriaValueText={valuetext}
          />
          <Input
            name="year"
            value={year[1]}
            margin="dense"
            onChange={handleSliderInputMax("year")}
            onBlur={handleSliderBlur("year")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxYear },
              type: "number",
              "aria-labelledby": "year-slider"
            }}
            disableUnderline
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Fuel type</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={fuelType.petrol}
                  onChange={handleCheckboxFilter("fuelType", "petrol")}
                  value="petrol"
                  color="primary"
                />
              }
              label="Petrol"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={fuelType.diesel}
                  onChange={handleCheckboxFilter("fuelType", "diesel")}
                  value="diesel"
                  color="primary"
                />
              }
              className={classes.marginTop}
              label="Diesel"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={fuelType.electric}
                  onChange={handleCheckboxFilter("fuelType", "electric")}
                  value="electric"
                  color="primary"
                />
              }
              className={classes.marginTop}
              label="Electric"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<i className="fas fa-check" />}
                  checkedIcon={<i className="fas fa-check" />}
                  checked={fuelType.hybrid}
                  onChange={handleCheckboxFilter("fuelType", "hybrid")}
                  value="hybrid"
                  color="primary"
                />
              }
              className={classes.marginTop}
              label="Hybrid"
              labelPlacement="end"
            />
          </FormGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Mileage</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Input
            name="mileage"
            value={mileage[0]}
            margin="dense"
            onChange={handleSliderInputMin("mileage")}
            onBlur={handleSliderBlur("mileage")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxMileage },
              type: "number",
              "aria-labelledby": "mileage-slider"
            }}
            disableUnderline
          />
          <Slider
            color="secondary"
            name="mileage"
            value={mileage}
            onChange={handleSliderFilter("mileage")}
            valueLabelDisplay="auto"
            aria-labelledby="mileage-slider"
            getAriaValueText={valuetext}
          />
          <Input
            name="mileage"
            value={mileage[1]}
            margin="dense"
            onChange={handleSliderInputMax("mileage")}
            onBlur={handleSliderBlur("mileage")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxMileage },
              type: "number",
              "aria-labelledby": "mileage-slider"
            }}
            disableUnderline
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Engine size</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Input
            name="engineSize"
            value={engineSize[0]}
            margin="dense"
            onChange={handleSliderInputMin("engineSize")}
            onBlur={handleSliderBlur("engineSize")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxEngineSize },
              type: "number",
              "aria-labelledby": "engineSize-slider"
            }}
            disableUnderline
          />
          <Slider
            color="secondary"
            name="engineSize"
            value={engineSize}
            onChange={handleSliderFilter("engineSize")}
            valueLabelDisplay="auto"
            aria-labelledby="engineSize-slider"
            getAriaValueText={valuetext}
          />
          <Input
            name="engineSize"
            value={engineSize[1]}
            margin="dense"
            onChange={handleSliderInputMax("engineSize")}
            onBlur={handleSliderBlur("engineSize")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxEngineSize },
              type: "number",
              "aria-labelledby": "engineSize-slider"
            }}
            disableUnderline
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Engine power</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Input
            name="enginePower"
            value={enginePower[0]}
            margin="dense"
            onChange={handleSliderInputMin("enginePower")}
            onBlur={handleSliderBlur("enginePower")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxEnginePower },
              type: "number",
              "aria-labelledby": "enginePower-slider"
            }}
            disableUnderline
          />
          <Slider
            color="secondary"
            name="enginePower"
            value={enginePower}
            onChange={handleSliderFilter("enginePower")}
            valueLabelDisplay="auto"
            aria-labelledby="enginePower-slider"
            getAriaValueText={valuetext}
          />
          <Input
            name="enginePower"
            value={enginePower[1]}
            margin="dense"
            onChange={handleSliderInputMax("enginePower")}
            onBlur={handleSliderBlur("enginePower")}
            inputProps={{
              step: 1,
              min: 0,
              max: { maxEnginePower },
              type: "number",
              "aria-labelledby": "enginePower-slider"
            }}
            disableUnderline
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default HomeFilters;
