import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Tag from '../../ui/Tag';
import { Flag } from '../../ui/Flag';
import Button from '../../ui/Button';
import { useCheckOut } from './useCheckOut';
import { useUser } from '../authentication/useUser';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const { checkOut, isCheckingOut } = useCheckOut();
  // const { isAdmin } = useUser();

  const disabled = isCheckingOut;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type='green'>Arriving</Tag>}
      {status === 'checked-in' && <Tag type='blue'>Departing</Tag>}

      <Flag src={guests.countryFlag || null} alt={`Flag of ${guests.country || null}`} />

      <Guest>{guests.fullName}</Guest>

      <div>
        {numNights} {numNights === 1 ? 'Night' : 'Nights'}
      </div>

      {status === 'unconfirmed' && (
        <Button size='small' variation='primary' as={Link} to={`/checkin/${id}`} disabled={disabled}>
          Check in
        </Button>
      )}
      {status === 'checked-in' && (
        <Button size='small' variation='primary' onClick={() => checkOut(id)} disabled={disabled}>
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}
