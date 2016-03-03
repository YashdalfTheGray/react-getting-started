var Button = React.createClass({
    handleClick: function() {
        this.props.handleClick(this.props.increment);
    },
    render: function() {
        return (
            <button onClick={this.handleClick}>Add {this.props.increment}</button>
        )
    }
});

var Result = React.createClass({
    render: function() {
        return (
            <div>{this.props.counterValue}</div>
        );
    }
});

var Card = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var self = this;
        $.get('https://api.github.com/users/' + self.props.username, function(data) {
            self.setState(data);
        });
    },
    render: function() {
        return (
            <div>
                <img src={this.state.avatar_url} width="80"/>
                <h4>{this.state.name}</h4>
            </div>
        );
    }
});

var GithubUserForm = React.createClass({
    handleSubmit: function(event) {
        event.preventDefault();
        var usernameInput = React.findDOMNode(this.refs.username);
        this.props.addCard(usernameInput.value);
        usernameInput.value = '';
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="Github Login" ref="username"/>
                <button>Add</button>
            </form>
        );
    }
});

var Main = React.createClass({
    getInitialState: function() {
        return {
            counter: 0,
            users: ['yashdalfthegray']
        };
    },
    handleClick: function(increment) {
        this.setState({
            counter: this.state.counter + increment
        });
    },
    addCard: function(username) {
        this.setState({
            users: this.state.users.concat(username)
        });
    },
    render: function() {
        var cards = this.state.users.map(function(user) {
            return (<Card username={user} />);
        });
        return (
            <div>
                <h2>Increment Display</h2>
                <div>
                    <Button handleClick={this.handleClick} increment={1} />
                    <Button handleClick={this.handleClick} increment={5} />
                    <Button handleClick={this.handleClick} increment={10} />
                    <Button handleClick={this.handleClick} increment={100} />
                    <Result counterValue={this.state.counter} />
                </div>
                <hr />
                <h2>Play Nine</h2>
                <PlayNineGame />
                <hr />
                <h2>Github Cards</h2>
                <GithubUserForm addCard = {this.addCard} />
                <p></p>
                {cards}
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.body);
