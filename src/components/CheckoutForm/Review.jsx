// import React from 'react';
// import { Typography, List, ListItem, ListItemText, Button } from '@material-ui/core';
// import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';


// const Review = ({ checkoutToken, shippingData, backStep,stripePromise, handleSubmit }) => {
//     if (!checkoutToken || !checkoutToken.live) return null;

//     return (
//         <>
//             <Typography variant="h6" gutterBottom>Order summary</Typography>
//             <List disablePadding>
//                 {checkoutToken?.live?.line_items?.map((product) => (
//                     <ListItem style={{ padding: '10px 0' }} key={product.name}>
//                         <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
//                         <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
//                     </ListItem>
//                 ))}
//                 <ListItem style={{ padding: '10px 0' }}>
//                     {!shippingData ? (
//                         <Typography variant="subtitle1">You have no shipping address. Please add one to continue.</Typography>
//                     ) : (
//                         <Elements stripe={stripePromise}>
//                             <ElementsConsumer>
//                                 {({ elements, stripe }) => (
//                                     <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
//                                         <CardElement />
//                                         <br /> <br />
//                                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                             <Button variant="outlined" onClick={backStep}>
//                                                 Back
//                                             </Button>
//                                             <Button
//                                                 type="submit"
//                                                 variant="contained"
//                                                 disabled={!stripe}
//                                                 color="primary"
//                                             >
//                                                 Pay {checkoutToken.live.subtotal.formatted_with_symbol}
//                                             </Button>
//                                         </div>
//                                     </form>
//                                 )}
//                             </ElementsConsumer>
//                         </Elements>
//                     )}
//                 </ListItem>
//             </List>
//         </>
//     );
// };

// export default Review;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
}));

const Review = ({ checkoutToken }) => {
    const classes = useStyles();

    if (!checkoutToken || !checkoutToken.live) {
        return null;
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>Order summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </>
    );
};

export default Review;
