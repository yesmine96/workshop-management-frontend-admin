import DropDown from 'components/common/DropDown/DropDown';
import Row from 'components/common/DropDown/DropDownRow';
import ArrowDown from 'components/icons/ArrowDown';
import useMouse from 'hooks/useMouse';
import { useRef } from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import classNames from 'utils/classNames';
import classes from './about.module.scss';
import HeaderLink from './HeaderLink';

const About = () => {
  const [open, onMouseEnter, onMouseLeave] = useMouse();
  const history = useHistory();
  const location = useLocation();

  const divRef = useRef<HTMLButtonElement>(null);

  const list = [
    {
      id: 0,
      title: 'Éditorial',
      pathname: '/informations?section=Éditorial',
    },
    {
      id: 1,
      title: 'Auteurs',

      pathname: '/auteurs',
    },
  ];
  const selected = list.some((e) => matchPath(location.pathname, e.pathname));
  return (
    <>
      <HeaderLink
        open={open}
        onMouseEnter={() => {
          onMouseEnter();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
        ref={divRef}
        type="button"
        selected={open || selected}
        className={classNames(
          'flex flex-1 flex-row h-full w-full justify-center items-center ',
          classes.aboutRoot,
          ` ${open && 'bg-blue-600 text-black'}`,
        )}
      >
        <div className="flex items-baseline">
          <ArrowDown className="mr-3" width="11px" /> A propos
        </div>
      </HeaderLink>

      <DropDown
        position={{ top: 112 }}
        onMouseEnter={() => {
          onMouseEnter();
        }}
        onMouseLeave={() => {
          onMouseLeave();
        }}
        open={open}
        anchorEl={divRef}
        full
      >
        {list
          ?.sort((a, b) => a.title[0].localeCompare(b.title, 'es', { sensitivity: 'base' }))
          .map((item) => (
            <Row
              pathname={item.pathname}
              selected={!!matchPath(location.pathname, item.pathname)}
              title={item.title}
              key={item.id}
              onClick={() => {
                history.push(`${item.pathname}`);
                onMouseLeave();
              }}
            />
          ))}
      </DropDown>
    </>
  );
};

export default About;
