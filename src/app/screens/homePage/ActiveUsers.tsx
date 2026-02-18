import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { CardCover, CssVarsProvider } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy";

const activeUsers = [
  { memberNick: "Martin", memberImage: "img/martin.webp" },
  { memberNick: "Justin", memberImage: "img/justin.webp" },
  { memberNick: "Rose", memberImage: "img/rose.webp" },
  { memberNick: "Nusret", memberImage: "img/nusret.webp" },
];

export default function ActiveUsers() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {activeUsers.length !== 0 ? (
                activeUsers.map((ele, index) => {
                  return (
                    <Stack className="card">
                      <Card sx={{ height: "100%" }}>
                        <CardCover>
                          <img src={ele.memberImage} alt="" />
                        </CardCover>
                      </Card>
                      <CardOverflow variant="plain">
                        <Box className="member-nickname">
                          {ele.memberNick}
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
