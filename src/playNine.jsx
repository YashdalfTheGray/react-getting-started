// from http://bit.ly/s-pcs
var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) {
        return true;
    }
    if (arr[0] > n) {
        return false;
    }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }

    var listSize = arr.length, combinationsCount = (1 << listSize);

    for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) {
                combinationSum += arr[j];
            }
        }
        if (n === combinationSum) {
            return true;
        }
    }
    return false;
};

var StarsFrame = React.createClass({
    render: function() {
        var stars = [];
        for (var i = 0; i < this.props.numberOfStars; i++) {
            stars.push(
                <span className="glyphicon glyphicon-star"></span>
            );
        }

        return (
            <div id="stars-frame">
                <div className="well">
                    {stars}
                </div>
            </div>
        );
    }
});

var ButtonFrame = React.createClass({
    render: function() {
        var disabled;
        var redrawDisabled = this.props.redraws <= 0;
        var button;
        var correct = this.props.correct;

        switch (correct) {
            case true:
                button = (
                    <button className="btn btn-success btn-lg" disabled={disabled} onClick={this.props.acceptAnswer}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                );
                break;
            case false:
                button = (
                    <button className="btn btn-danger btn-lg" disabled={disabled}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                );
                break;
            default:
                disabled = (this.props.selectedNumbers.length === 0);
                button = (
                    <button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>
                        =
                    </button>
                );
                break;
        }

        return (
            <div id="button-frame">
                {button}
                <br/>
                <br/>
                <button className="btn btn-warning btn-xs" disabled={redrawDisabled} onClick={this.props.redraw}>
                    <span className="glyphicon glyphicon-refresh extra-padding-right"></span>
                    {this.props.redraws}
                </button>
            </div>
        );
    }
});

var AnswerFrame = React.createClass({
    render: function() {
        var props = this.props;
        var selectedNumbers = props.selectedNumbers.map(function(i) {
            return (
                <span onClick={props.unselectNumber.bind(null, i)}>{i}</span>
            );
        });
        return (
            <div id="answer-frame">
                <div className="well">
                    {selectedNumbers}
                </div>
            </div>
        );
    }
});

var NumbersFrame = React.createClass({
    render: function() {
        var numbers = 9;

        var numberBadges = [], className;
        var selectedNumbers = this.props.selectedNumbers;
        var usedNumbers = this.props.usedNumbers;
        for (var i = 1; i <= numbers; i++) {
            className = 'number selected-' + (selectedNumbers.indexOf(i) >= 0);
            className += ' used-' + (usedNumbers.indexOf(i) >= 0);
            numberBadges.push(
                <div className={className} onClick={this.props.selectNumber.bind(null, i)}>{i}</div>
            );
        }

        return (
            <div id="numbers-frame">
                <div className="well">
                    {numberBadges}
                </div>
            </div>
        );
    }
});

var DoneFrame = React.createClass({
    render: function() {
        return (
            <div className="well text-center">
                <h2>{this.props.doneStatus}</h2>
                <button className="btn btn-default" onClick={this.props.resetGame}>Play Again</button>
            </div>
        );
    }
});

var PlayNineGame = React.createClass({
    getRandomNumber: function() {
        return Math.floor(Math.random() * 9) + 1;
    },
    getInitialState: function() {
        return {
            selectedNumbers: [],
            usedNumbers: [],
            numberOfStars: this.getRandomNumber(),
            correct: null,
            redraws: 5,
            doneStatus: null
        }
    },
    selectNumber: function(clickedNumber) {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0 && this.state.usedNumbers.indexOf(clickedNumber) < 0) {
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
                correct: null
            });
        }
    },
    unselectNumber: function(clickedNumber) {
        var selectedNumbers = this.state.selectedNumbers;
        var indexOfNumber = selectedNumbers.indexOf(clickedNumber);
        selectedNumbers.splice(indexOfNumber, 1);

        this.setState({
            selectedNumbers: selectedNumbers,
            correct: null
        });
    },
    sumOfSelectedNumbers: function() {
        return this.state.selectedNumbers.reduce(function(sum, number) {
            return sum + number;
        }, 0);
    },
    checkAnswer: function() {
        var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
        this.setState({
            correct: correct
        });
    },
    acceptAnswer: function() {
        var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
        this.setState({
            selectedNumbers: [],
            usedNumbers: usedNumbers,
            correct: null,
            numberOfStars: this.getRandomNumber()
        }, function() {
            this.updateDoneStatus();
        });
    },
    redraw: function() {
        this.setState({
            numberOfStars: this.getRandomNumber(),
            correct: null,
            selectedNumbers: [],
            redraws: this.state.redraws - 1
        }, function() {
            this.updateDoneStatus();
        });
    },
    possibleSolution: function() {
        var numberOfStars = this.state.numberOfStars;
        var possibleNumbers = [];
        var usedNumbers = this.state.usedNumbers;

        for (var i = 1; i <= 9; i++) {
            if (usedNumbers.indexOf(i) < 0) {
                possibleNumbers.push(i);
            }
        }

        return possibleCombinationSum(possibleNumbers, numberOfStars);
    },
    updateDoneStatus: function() {
        if (this.state.usedNumbers.length === 9) {
            this.setState({
                doneStatus: 'Good game!'
            });
            return;
        }
        if (this.state.redraws <= 0 && !this.possibleSolution()) {
            this.setState({
                doneStatus: 'Game over!'
            });
            return;
        }
    },
    resetGame: function() {
        this.replaceState(this.getInitialState());
    },
    render: function() {
        var selectedNumbers = this.state.selectedNumbers;
        var numberOfStars = this.state.numberOfStars;
        var correct = this.state.correct;
        var usedNumbers = this.state.usedNumbers;
        var redraws = this.state.redraws;
        var doneStatus = this.state.doneStatus;
        var bottomFrame;

        if (doneStatus) {
            bottomFrame = <DoneFrame
                doneStatus={doneStatus}
                resetGame={this.resetGame} />;
        }
        else {
            bottomFrame = <NumbersFrame
                selectedNumbers={selectedNumbers}
                usedNumbers={usedNumbers}
                selectNumber={this.selectNumber} />;
        }

        return (
            <div>
                <div className="clearfix">
                    <StarsFrame
                        numberOfStars={numberOfStars} />
                    <ButtonFrame
                        selectedNumbers={selectedNumbers}
                        correct={correct}
                        redraws={redraws}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw} />
                    <AnswerFrame
                        selectedNumbers={selectedNumbers}
                        unselectNumber={this.unselectNumber} />
                </div>
                {bottomFrame}
            </div>
        );
    }
});
