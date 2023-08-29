import { IReview } from '@/types/globalTypes';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAppSelector } from '@/redux/hook';

interface IProps {
  data: IReview[];
}

const Reviews: FC<IProps> = ({ data }) => {
  const currentUser = useAppSelector((state) => state.auth.userInfo);

  return (
    <div className={`flex flex-col gap-4 p-4 border border-gray-200`}>
      {data?.map(({ comment, user, _id }: IReview) => (
        <div key={_id}>
          <div
            className={`flex align-baseline gap-2 flex-row${
              currentUser?._id === user?.id && '-reverse'
            } justify-items${currentUser?._id === user?.id ? 'end' : 'start'}`}
          >
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user?.firstName[0] + user?.lastName[0]}
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
