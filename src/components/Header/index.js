import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { Wrapper, Container, Logo, BasketContainer, ItemCount } from './styles';

function Header({ navigation, cartSize }) {
  return (
    <Wrapper>
      <Container>
        <BasketContainer onPress={() => navigation.navigate('Main')}>
          <Logo />
        </BasketContainer>
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}

Header.propTypes = {
  navigation: PropTypes.node.isRequired,
  cartSize: PropTypes.number.isRequired,
};

export default connect(
  (state) => ({
    cartSize: state.cart.length,
  }),
  null,
)(Header);
