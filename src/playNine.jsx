var StarsFrame = React.createClass({
    render: function() {
        var numberOfStars = Math.floor(Math.random() * 9) + 1;

        var stars = [];
        for (var i = 0; i < numberOfStars; i++) {
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
        return (
            <div id="button-frame">
                <button className="btn btn-primary btn-lg">=</button>
            </div>
        );
    }
});

var AnswerFrame = React.createClass({
    render: function() {
        return (
            <div id="answer-frame">
                <div className="well">
                </div>
            </div>
        );
    }
});

var NumbersFrame = React.createClass({
    render: function() {
        var numbers = 9;

        var numberBadges = [];
        for (var i = 1; i <= numbers; i++) {
            numberBadges.push(
                <div className="number">{i}</div>
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

var PlayNineGame = React.createClass({
    render: function() {
        return (
            <div>
                <div className="clearfix">
                    <StarsFrame />
                    <ButtonFrame />
                    <AnswerFrame />
                </div>
                <NumbersFrame />
            </div>
        );
    }
});
