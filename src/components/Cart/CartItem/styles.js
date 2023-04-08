import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    media: {
        height: 260,
    },
    card: {
        height: "100%",
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between",
    },
    cartActions: {
        justifyContent: "space-between",
    },
    buttons: {
        display: "flex",
        alignItems: "center",
    },
}));

// export default useStyles;
