import React from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addBoard } from "../actions";
import BoardThumbnail from "./BoardThumbnail";
import Header from './Header';


const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CreateTitle = styled.h3`
  font-size: 48px;
  color: white;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: blue;
  box-shadow: 0 2px 4px grey;
  align-self: center;
`;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newBoardTitle: '',
    }
  }

  handleChange = e => {
    this.setState({ newBoardTitle: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(addBoard(this.state.newBoardTitle));
  };

  renderBoards = () => {
    const { boards, boardOrder } = this.props;
    return boardOrder.map(boardID => {
      const board = boards[boardID];

      return (
        <Link
          key={boardID}
          to={`/${board.id}`}
          style={{ textDecoration: "none" }}
        >
          <BoardThumbnail {...board} />
        </Link>
      );
    });
  };

  renderCreateBoard = () => {
    return (
      <form onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
        <CreateTitle>Create a new Board</CreateTitle>
        <CreateInput
          onChange={this.handleChange}
          value={this.state.newBoardTitle}
          placeholder="Your boards title..."
          type="text"
        />
      </form>
    );
  };

  render() {
    const token = localStorage.getItem("token");
    if (!token) return <Redirect to="/login" />;
    return (
      <>
        <Header />
        <HomeContainer>
          <Thumbnails>{this.renderBoards()}</Thumbnails>
          {this.renderCreateBoard()}
        </HomeContainer>
      </>
    );
  }
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

export default connect(mapStateToProps)(Home);
