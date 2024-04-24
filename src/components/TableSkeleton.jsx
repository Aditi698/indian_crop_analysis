import { Table } from "@mantine/core";
import React from "react";

export default function TableSkeleton({ tableHeaders = [], children }) {
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          {tableHeaders.map((headers) => (
            <Table.Th key={headers}>{headers}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{children}</Table.Tbody>
    </Table>
  );
}
