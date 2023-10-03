/* eslint-disable no-unused-vars */
import Paper from "@mui/material/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { scaleBand } from "@devexpress/dx-chart-core";
import { ArgumentScale } from "@devexpress/dx-react-chart";
import { Animation } from "@devexpress/dx-react-chart";
import { EventTracker } from "@devexpress/dx-react-chart";
import dayjs from "dayjs";

// eslint-disable-next-line react/prop-types
const SalesByBranchChart = ({ dataSales }) => {
  // eslint-disable-next-line react/prop-types
  const chartDate = dataSales.map((item) => {
    item.month = dayjs()
      .month(item._id - 1)
      .format("MMMM");
    return item;
  });

  return (
    <Paper>
      <Chart data={dataSales}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="totalSales" argumentField="month" />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
};

export default SalesByBranchChart;
