import "./MovRow.css";

const MovRow = (props) => {
  let classType = "movements__type--deposit"; // Assume it's deposit
  let movType = "deposit";

  const amount = props.mov[0];
  const date = props.mov[1];

  //  Format amount
  const option = {
    style: "currency",
    currency: props.currentCurrency,
  };
  const formattedAmount = new Intl.NumberFormat(
    props.currentLocale,
    option
  ).format(amount.toFixed(2));

  //  Format date
  const calcDayDifference = (date1, date2) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

  const formatDate = (date, locale) => {
    const option = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    const dayDifference = calcDayDifference(new Date(), date);

    if (dayDifference < 1) return "today";

    if (dayDifference < 2) return "yesterday";

    if (dayDifference < 14) return `${Math.floor(dayDifference)} days ago`;

    if (Math.floor(dayDifference) === 14) return "two weeks ago";

    return new Intl.DateTimeFormat(locale, option).format(date);
  };

  const formattedDate = formatDate(date, props.currentLocale);

  //  Decide if this is a withdrawal
  if (amount < 0) {
    classType = "movements__type--withdrawal";
    movType = "withdrawal";
  }

  return (
    <div>
      <div className="movements__row">
        <div className={`movements__type ${classType}`}>{movType}</div>
        <div className="movements__date">{formattedDate}</div>
        <div className="movements__value">{formattedAmount}</div>
      </div>
    </div>
  );
};

export default MovRow;
