import { IReview, IUser } from '@/types/globalTypes';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAppSelector } from '@/redux/hook';

interface IProps {
  data: IReview[];
}

const Reviews: FC<IProps> = ({ data }) => {
  const currentUser = useAppSelector<IUser | null>(
    (state) => state.auth.userInfo
  );
  console.log('user: ', currentUser);

  return (
    <div className={`flex flex-col gap-4 p-4 border border-gray-200`}>
      {data?.map(({ comment, user, _id }: IReview) => (
        <div key={_id}>
          <div
            className={`flex align-baseline gap-2 ${
              currentUser?._id === user?.id && 'flex-row-reverse'
            } justify-items-${currentUser?._id === user?.id ? 'end' : 'start'}`}
          >
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user && user.firstName[0] + user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <span
              style={{
                clipPath:
                  currentUser?._id === user?.id
                    ? 'polygon(100% 0, 86% 17%, 87% 100%, 0 100%, 0 0)'
                    : 'polygon(0 0, 100% 0, 100% 100%, 16% 100%, 16% 18%)',
              }}
              className={`bg-gray-200 px-2 py-1 ${
                currentUser?._id === user?.id ? 'pe-6' : 'ps-6'
              }`}
            >
              {comment}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
