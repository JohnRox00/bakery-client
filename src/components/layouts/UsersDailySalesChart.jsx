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
const UserDailySaleChart = ({ dataSales }) => {
  // eslint-disable-next-line react/prop-types
  const chartDate = dataSales.map((item) => {
    item.day = dayjs()
      .date(item._id + 1)
      .format("DD");
    return item;
  });

  return (
    <Paper>
      <Chart data={dataSales}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="totalSales" argumentField="day" />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
};

export default UserDailySaleChart;
