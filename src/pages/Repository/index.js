import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Loading } from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
    };

    async componentDidMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`/respos/${repoName}/`),
            api.get(`/respos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5,
                },
            }),
        ]);

        console.log(repository);

        this.setState({
            loading: false,
            repository: repository.data,
            issues: issues.data,
        });
    }

    render() {
        const { loading, repository, issues } = this.state;

        if (loading) {
            return <Loading>Carregando</Loading>;
        }

        return (
            <Container>
                <h1>Repository:</h1>
            </Container>
        );
    }
}
