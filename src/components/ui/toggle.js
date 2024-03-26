import React from "react";

import TeamMember from "../Auth/teamMember";
import Permissions from "../Auth/permissions";
import Notifications from "../Auth/notifications";

import "./styles/toggle.css";

const array = [
  {
    label: "Team Member",
    className: "this.state.teamMemberClassName",
  },
  {
    label: "Permissions",
    className: "this.state.permissionsClassName",
  },
  //   {
  //     label: "Notifications",
  //     className: {this.state.notificationsClassName},
  //     // className: "this.state.notificationsClassName",
  //   },
];

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMemberClassName: "toggle highlight",
      permissionsClassName: "toggle rest",
      notificationsClassName: "toggle rest",
      teamMemberDiv: "show",
      permissionsDiv: "hide",
      notificationsDiv: "hide",
    };
    this.highlightToggle = this.highlightToggle.bind(this);
  }

  highlightToggle(number) {
    if (number == 0) {
      console.log(0);
      this.setState({
        teamMemberClassName: "toggle highlight",
        permissionsClassName: "toggle rest",
        notificationsClassName: "toggle rest",
        teamMemberDiv: "show",
        permissionsDiv: "hide",
        notificationsDiv: "hide",
      });
    } else if (number == 1) {
      console.log(1);
      this.setState({
        teamMemberClassName: "toggle rest",
        permissionsClassName: "toggle highlight",
        notificationsClassName: "toggle rest",
        teamMemberDiv: "hide",
        permissionsDiv: "show",
        notificationsDiv: "hide",
      });
    } else if (number == 2) {
      console.log(2);
      this.setState({
        teamMemberClassName: "toggle rest",
        permissionsClassName: "toggle rest",
        notificationsClassName: "toggle highlight",
        teamMemberDiv: "hide",
        permissionsDiv: "hide",
        notificationsDiv: "show",
      });
    }
  }

  generateTabs(array, highlightToggle) {
    return Object.keys(array).map((key) => {
      return (
        <p
          onClick={() => highlightToggle(key)}
          className={array[key].className}
        >
          {array[key].label}
        </p>
      );
    });
  }

  render() {
    return (
      <div className="formWrapper">
        <div className="toggleWrapper" onClick={this.handleToggle}>
          {/* {this.generateTabs(array, this.highlightToggle)} */}
          <p
            onClick={() => this.highlightToggle(0)}
            className={this.state.teamMemberClassName}
          >
            Team Member
          </p>
          <p
            onClick={() => this.highlightToggle(1)}
            className={this.state.permissionsClassName}
          >
            Permissions
          </p>
          <p
            onClick={() => this.highlightToggle(2)}
            className={this.state.notificationsClassName}
          >
            Notifications
          </p>
        </div>
        <div className={this.state.teamMemberDiv}>
          <TeamMember />
        </div>
        <div className={this.state.permissionsDiv}>
          <Permissions />
        </div>
        <div className={this.state.notificationsDiv}>
          <Notifications />
        </div>
      </div>
    );
  }
}
