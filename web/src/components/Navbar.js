import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const StyledNav = styled.nav`
  background-color: white;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
  }
  ul li {
    padding: 20px;
    :hover {
      background-color:  ${props => props.theme.lightGrey};
    }
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: ${props => props.theme.blue};
  :hover {
    color: ${props => props.theme.blueAccent};
  }
`

export default function Navbar() {

  const { loggedIn } = useContext(UserContext);

  return (
    <StyledNav>
      <ul>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        { loggedIn ? null :
          <>
            <li>
              <StyledLink to="/login">Log in</StyledLink>
            </li>
            <li>
              <StyledLink to="/signup">Sign up</StyledLink>
            </li>
          </>
        }
      </ul>
    </StyledNav>
  )
}