import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../useAuth';

const StyledNav = styled.nav`
  border-bottom: 1px solid ${props => props.theme.grey};
  background-color: ${props => props.theme.lightGrey};

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
      background-color:  ${props => props.theme.grey};
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

  const { user } = useAuth();

  return (
    <StyledNav>
      <ul>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        { user ? <div>{user.email}</div> :
          (
            <>
              <li>
                <StyledLink to="/login">Log in</StyledLink>
              </li>
              <li>
                <StyledLink to="/signup">Sign up</StyledLink>
              </li>
            </>
          )
        }
      </ul>
    </StyledNav>
  )
}