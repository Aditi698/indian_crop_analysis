import React, { useState } from "react";
import { Table, Tabs, Title } from "@mantine/core";
import styles from "./CropAnalytics.module.css";
import cropsData from "../../lib/dataset.json";
import TableSkeleton from "../../components/TableSkeleton";
import {
  cropAverageYieldAreaAggregate,
  cropProductionYearlyAggregate,
} from "../../lib/util";

export default function CropAnalytics() {
  const [activeTab, setActiveTab] = useState(
    "Crop_Production_Yearly_Aggregate"
  );

  function generateTableContent(table) {
    if (table === "Crop_Production_Yearly_Aggregate") {
      const meta = cropAverageYieldAreaAggregate(cropsData);
      return Object.keys(meta).map((year) => (
        <Table.Tr key={year}>
          <Table.Td>{year}</Table.Td>
          <Table.Td>{meta[year].maxProductionCrops.join(", ")}</Table.Td>
          <Table.Td>{meta[year].minProductionCrops.join(", ")}</Table.Td>
        </Table.Tr>
      ));
    } else if (table === "Crop_Average_Yield_Area_Aggregate") {
      const meta = cropProductionYearlyAggregate(cropsData, 1950, 2020);
      return Object.keys(meta).map((cropName) => (
        <Table.Tr key={cropName}>
          <Table.Td>{cropName}</Table.Td>
          <Table.Td>
            {(meta[cropName].totalYield / meta[cropName].totalArea).toFixed(3)}
          </Table.Td>
          <Table.Td>
            {(meta[cropName].totalArea / meta[cropName].count).toFixed(3)}
          </Table.Td>
        </Table.Tr>
      ));
    }
  }

  const tabsData = [
    {
      value: "Crop_Production_Yearly_Aggregate",
      title: "Crop Production Yearly Aggregate",
      tableHeaders: [
        "Year",
        "Crop with Maximum Production",
        "Crop with Minimum Production",
      ],
    },
    {
      value: "Crop_Average_Yield_Area_Aggregate",
      title: "Crop Average Yield Area Aggregate",
      tableHeaders: [
        "Crop Name",
        "Average Yield of the Crop between 1950-2020",
        "Average Cultivation Area of the Crop between 1950-2020",
      ],
    },
  ];

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        {tabsData.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            <Title order={6}>{tab.title}</Title>
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabsData.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value}>
          <div className={styles.tabContainer}>
            <TableSkeleton tableHeaders={tab.tableHeaders}>
              {generateTableContent(tab.value)}
            </TableSkeleton>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
