import axios from "axios";
import React, { useEffect, useState } from "react";

function Transactions() {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    fetchorders();
  }, []);

  const fetchorders = async () => {
    const response = await axios.get("http://localhost:3000/api/users/transactions",{ headers: { Authorization: localStorage.getItem("token") } }
    );

    setTransaction(response.data.data);
  };

  return (
    <div>
      <table>
        <thead>
          <tr style={{border:"1px solid black"}}>
            <th className="p-5">transaction id</th>
            <th className="p-5">product</th>
            <th className="p-5">product name</th>
            <th className="p-5">price</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((item) => {
            return (
              <tr>
                <td className="p-5" style={{border:"1px solid black"}}>{item.transactionId}</td>
                {item.product.map((product) => {
                  return (
                    <>
                      <td className="p-5" style={{border:"1px solid black"}}>
                        <img src={`http://localhost:3000/${product.profile}`} alt="loading" style={{width:"80px" ,height:"80px" , borderRadius:"15px"}}/>
                      </td>
                      <td className="p-5" style={{border:"1px solid black"}}>{product.name}</td>
                      <td className="p-5" style={{border:"1px solid black"}}>{product.price}</td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
