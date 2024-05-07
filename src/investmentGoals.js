function convertoMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlyContribuition = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  if (!startingAmount || !timeHorizon) {
    throw new Error(
      "Investimento inicial e prazo devem ser preenchidos com valores positivos."
    );
  }

  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertoMonthlyReturnRate(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenceInvestimentObject = {
    investedAmount: startingAmount,
    investReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnArray = [referenceInvestimentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnArray[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribuition;

      const investReturns = returnArray[timeReference - 1].totalAmount * (finalReturnRate - 1) ;
      const investedAmount = startingAmount + monthlyContribuition * timeReference;
      const totalInterestReturns = totalAmount - investedAmount;
      returnArray.push({
      investedAmount,
      investReturns,
      totalInterestReturns,
      month: timeReference,
      totalAmount,
      });
  }

  return returnArray;
}
