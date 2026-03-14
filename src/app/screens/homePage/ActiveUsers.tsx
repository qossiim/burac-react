import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { CardCover, CssVarsProvider } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy";
import { useSelector } from "react-redux";
import { createSelector  } from "reselect";
import { retrieveTopUsers } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";


/** Redux Slice Selector */
const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers) => ({topUsers})
);


export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                   const imagePath = `${serverApi}/${member.memberImage}`;
                  return (

                    <Stack className="card">
                      <Card sx={{ height: "100%" }}>
                        <CardCover>
                          <img src={imagePath} alt="" />
                        </CardCover>
                      </Card>
                      <CardOverflow variant="plain">
                        <Box className="member-nickname">
                          {member.memberNick}
                        </Box>
                      </CardOverflow>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
