// import React from 'react';
// import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

// import useStyles from './styles';

// const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
//     const classes = useStyles();

//     const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

//     const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

//     return (
//         <Card className={classes.card}>
//             <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
//             <CardContent className={classes.cardContent} style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography variant="h4">{item.name}</Typography>
//                 <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
//             </CardContent>
//             <CardActions className={classes.cardActions} style={{ justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <Button className={classes.button} type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
//                     <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
//                     <Button className={classes.button} type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
//                 </div>
//                 <Button className={classes.button} variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
//             </CardActions>
//         </Card>
//     );
// };

// export default CartItem;
import React, { useState } from "react";
import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from "@material-ui/core";

import useStyles from "./styles";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    const classes = useStyles();
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleUpdateCartQty = (lineItemId, newQuantity) =>
        onUpdateCartQty(lineItemId, newQuantity);

    const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

    return (
        <Card className={classes.card}>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <div>
                    <Typography variant="h4">{item.name}</Typography>
                    <Typography>
                        {showFullDescription
                            ? item.description
                            : item.description.substring(0, 100) + "..."}
                    </Typography>
                    {item.description.length > 100 && (
                        <Button onClick={() => setShowFullDescription(!showFullDescription)}>
                            {showFullDescription ? "Read Less" : "Read More"}
                        </Button>
                    )}
                </div>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button
                        type="button"
                        size="small"
                        onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
                    >
                        -
                    </Button>
                    <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                    <Button
                        type="button"
                        size="small"
                        onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
                    >
                        +
                    </Button>
                </div>
                <Button
                    variant="contained"
                    type="button"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item.id)}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;
