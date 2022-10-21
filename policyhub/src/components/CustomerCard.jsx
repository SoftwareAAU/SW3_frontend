import './CustomerCard.css';

const CustomerCard = ({
  name,
  type,
  address,
  city,
}) => {
  return (
    <div className="customercard">
      <p className="customername">
        {name}
      </p>
      <p className="customertype">
        {type}
      </p>
      <p className="customeraddress">
        {address}
      </p>
      <p className="customercity">
        {city}
      </p>

    </div>
  );
}
 
export default CustomerCard;