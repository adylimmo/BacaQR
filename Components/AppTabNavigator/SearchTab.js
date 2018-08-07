import React, { Component } from "react";
import {
    Text
} from "react-native";

import { Icon, ListItem, Left, Right, Button, Body, Container, Content } from 'native-base'

class SearchTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <Container>
            <Content>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Profile</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="md-home" />
                  </Button>
                </Left>
                <Body>
                  <Text>Company Information</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Task</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>History</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "black" }}>
                    <Icon active name="ios-alarm" />
                  </Button>
                </Left>
                <Body>
                  <Text>Absence</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Claim</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Offline Mode</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="ios-eye" />
                  </Button>
                </Left>
                <Body>
                  <Text>Location</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Change Password</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>About</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>Signt out</Text>
                </Body>
                <Right>
                  <Icon active name="ios-arrow-forward" />
                </Right>
              </ListItem>
            </Content>
          </Container>
        );
    }
}
export default SearchTab;