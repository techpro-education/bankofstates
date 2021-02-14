import React from "react";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import AccountBalance from "@material-ui/icons/AccountBalance";
import AttachMoney from "@material-ui/icons/AttachMoney";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import Accessibility from "@material-ui/icons/Accessibility";
import CardBody from "../components/Card/CardBody.js";

import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardFooter from "../components/Card/CardFooter.js";
import PlotlyChart from "../chart/PlotlyChart";
import styles from "../styles/dashboardStyle.js";
import _ from "lodash";
const useStyles = makeStyles(styles);

const transferData = [
  {
    type: "funnel",
    x: [3500, 3000, 2800, 2500, 2000, 1000, 500],
    y: ["5/Jan", "8/Jan", "2/Jan", "1/Jan", "7/Jan", "3/Jan", "10/Jan"],
    hoverinfo: "percent total+x",
  },
];
const User = () => {
  const classes = useStyles();
  const [{ userInfo }] = useStateValue();
  const history = useHistory();
  const transactions = userInfo.user.transactions;
  const uniqDates = _.uniq(_.map(transactions, "date")).sort();
  const depositArray = [];
  const withdrawalArray = [];
  uniqDates.forEach(function (key) {
    const deposits = _.filter(transactions, function (transaction) {
      return transaction.type === "DEPOSIT" && transaction.date === key;
    });
    const withdraws = _.filter(transactions, function (transaction) {
      return transaction.type === "WITHDRAW" && transaction.date === key;
    });
    const depositAmounts = _.map(deposits, "amount");
    const withdrawAmounts = _.map(withdraws, "amount");
    const sumOfDeposits = _.sum(depositAmounts);
    const sumOfWithdraws = _.sum(withdrawAmounts);
    depositArray.push(sumOfDeposits);
    withdrawalArray.push(sumOfWithdraws);
  });
  const totalDeposit = _.sum(depositArray);
  const totalWithdrawal = _.sum(withdrawalArray);
  const depositData = [
    {
      type: "bar",
      x: uniqDates,
      y: depositArray,
    },
  ];
  const withdrawalData = [
    {
      type: "scatter",
      x: uniqDates,
      y: withdrawalArray,
    },
  ];
  return (
    <div>
      {!userInfo && history.push("/login")}
      {userInfo && userInfo.user && (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <AccountBalance />
                  </CardIcon>
                  <p className={classes.cardCategory}>Balance</p>
                  <h3 className={classes.cardTitle}>
                    $ {userInfo.user.accountBalance}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                    Just Updated
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <AttachMoney />
                  </CardIcon>
                  <p className={classes.cardCategory}>Deposits</p>
                  <h3 className={classes.cardTitle}>${totalDeposit}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    Last 1 Week
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <AccountBalanceWallet />
                  </CardIcon>
                  <p className={classes.cardCategory}>Withdrawals</p>
                  <h3 className={classes.cardTitle}>${totalWithdrawal}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    Last 1 Week
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Accessibility />
                  </CardIcon>
                  <p className={classes.cardCategory}>Recipients</p>
                  <h3 className={classes.cardTitle}>5</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                    Latest
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="success">
                  <h4 color="white">Deposit Trends</h4>
                </CardHeader>
                <CardBody>
                  <PlotlyChart data={depositData} />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="danger">
                  <h4 color="white">Withdrawal Trends</h4>
                </CardHeader>
                <CardBody>
                  <PlotlyChart data={withdrawalData} />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card chart>
                <CardHeader color="info">
                  <h4 color="white">Transfer Trends</h4>
                </CardHeader>
                <CardBody>
                  <PlotlyChart data={transferData} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      )}
    </div>
  );
};

export default User;
