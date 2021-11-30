import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://staging.fastor.in/v1/m/restaurant?city_id=118&&")
      .then((res) => {
        console.log(res);
        setRestaurantData(res.data);
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
    // return <Navigate to = "/otp" />
    // return <Route path ="*" element ={<Navigate to ="/otp" replace/>} />
  }, []);

  const handleImageShare = (data) => {
    navigate("/share", { state: { url: data } });
  };

  return (
    <>
      {restaurantData ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant="h4" gutterBottom component="div">
            Popular Restaurants
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}
          >
            {restaurantData.map((restaurant) => (
              <>
                <ListItem
                  alignItems="flex-start"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImageShare(restaurant.images[0].url)}
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={restaurant.images[0].url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={restaurant.restaurant_name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Cusinies-{" "}
                          {restaurant.cuisines.map(
                            (data) => `${data.cuisine_name}, `
                          )}
                        </Typography>
                        <br />
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Rating- {restaurant.rating.restaurant_avg_rating}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </Box>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
}
