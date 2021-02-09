import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloCreate from "./TrelloCreate";
import { Redirect } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "../actions";
import { Link } from "react-router-dom";
import Header from './Header';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class TrelloBoard extends PureComponent {

  componentDidMount() {
    // set active trello board here
    const { boardID } = this.props.match.params;

    this.props.dispatch(setActiveBoard(boardID));
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const token = localStorage.getItem("token");
    if (!token) return <Redirect to="/login" />;
    const { lists, cards, match, boards } = this.props;
    const { boardID } = match.params;
    const board = boards[boardID];
    if (!board) {
      return <p>Board not found</p>;
    }
    const listOrder = board.lists;
    const style = {
      top: {
        position: "relative",
        top: '50px',
      },
      bottom: {
        position: "relative",
        bottom: '50px',
      }
    }
    return (
      <>
        <Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div>
            <h2 style={style.bottom}>{board.title}</h2>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                <ListsContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {listOrder.map((listID, index) => {
                    const list = lists[listID];
                    if (list) {
                      const listCards = list.cards.map(cardID => cards[cardID]);

                      return (
                        <TrelloList
                          listID={list.id}
                          key={list.id}
                          title={list.title}
                          cards={listCards}
                          index={index}
                        />
                      );
                    }
                  })}
                  {provided.placeholder}
                  <TrelloCreate list />
                </ListsContainer>
              )}
            </Droppable>
            <Link style={style.top} to="/home">Go Back</Link>
          </div>
        </DragDropContext>
      </>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards
});

export default connect(mapStateToProps)(TrelloBoard);
