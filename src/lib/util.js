// Function to aggregate crop data by average yield and area for each year
export function cropAverageYieldAreaAggregate(cropsData) {
  // Object to store aggregated data
  const aggregatedData = {};
  cropsData.forEach((entry) => {
    const year = entry.Year.split(",")[1].trim();
    // If the year is not already in aggregatedData, initialize its properties
    if (!aggregatedData[year]) {
      aggregatedData[year] = {
        maxProductionCrops: [],
        minProductionCrops: [],
        maxProduction: -Infinity,
        minProduction: Infinity,
      };
    }
    // Extracting the production value from the entry, defaulting to 0 if not present
    const production =
      parseFloat(entry["Crop Production (UOM:t(Tonnes))"]) || 0;
    // Update max production and corresponding crops
    if (production > aggregatedData[year].maxProduction) {
      aggregatedData[year].maxProduction = production;
      aggregatedData[year].maxProductionCrops = [entry["Crop Name"]];
    } else if (production === aggregatedData[year].maxProduction) {
      aggregatedData[year].maxProductionCrops.push(entry["Crop Name"]);
    }
    // Update min production and corresponding crops
    if (production < aggregatedData[year].minProduction) {
      aggregatedData[year].minProduction = production;
      aggregatedData[year].minProductionCrops = [entry["Crop Name"]];
    } else if (production === aggregatedData[year].minProduction) {
      aggregatedData[year].minProductionCrops.push(entry["Crop Name"]);
    }
  });
  return aggregatedData;
}

export function cropProductionYearlyAggregate(
  cropsData,
  startYear = 1950,
  endYear = 2020
) {
  const aggregatedData = {};

  cropsData.forEach((entry) => {
    const cropName = entry["Crop Name"];
    const year = entry.Year.split(",")[1].trim();

    if (year >= startYear && year <= endYear) {
      // Check if the year is within the specified range
      if (!aggregatedData[cropName]) {
        aggregatedData[cropName] = {
          totalYield: 0,
          totalArea: 0,
          count: 0,
        };
      }

      const yieldPerHa =
        parseFloat(entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) ||
        0;
      const area =
        parseFloat(entry["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;

      aggregatedData[cropName].totalYield += yieldPerHa * area;
      aggregatedData[cropName].totalArea += area;
      aggregatedData[cropName].count++;
    }
  });

  return aggregatedData;
}
