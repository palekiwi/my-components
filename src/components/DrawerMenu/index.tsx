import * as React from "react";
import { MenuButton } from "./MenuButton";
import { CloseButton } from "./CloseButton";
import { styled, Flex } from "primithemes";
import { useTransition, animated } from "react-spring";

const DrawerWrapper = styled.div`
  z-index: 1400;
  display: block;
`;

const Dmenu = styled(animated.div)`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
`;

const DrawerOverlay = styled(animated.div)`
  z-index: 0;
  position: fixed;
  height: 100vh;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
`;

const DrawerContent = styled.div`
  z-index: 1400;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const DrawerContentWrapper = styled(Flex)`
  height: 100vh;
  position: relative;
  overflow-y: auto;
  width: 300px;
`;

interface DrawerMenuProps {
  logo?: any;
  title?: React.ReactNode;
  navItems: { to: string; label: string }[];
}

const useShowMenu = () => {
  const [show, set] = React.useState(false);
  const open = () => {
    set(true);
  };

  const close = () => {
    set(false);
  };

  return { show, open, close };
};

const useDisableBodyScroll = (show: boolean) => {
  React.useEffect(() => {
    document.body.style.overflowY = show ? "hidden" : "scroll";
  }, [show]);
};

const useDrawer = (width: number) => {
  const { show, open, close } = useShowMenu();
  useDisableBodyScroll(show);

  const drawer = useTransition(show, null, {
    from: { transform: `translate3d(${width}px,0,0)` },
    enter: { transform: `translate3d(0,0,0)` },
    leave: { transform: `translate3d(${width}px,0,0)` },
  });

  const overlay = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return { show, open, close, drawer, overlay };
};

const DrawerMenu: React.SFC<DrawerMenuProps> = ({ logo, title, navItems }) => {
  const { open, close, drawer, overlay } = useDrawer(300);

  return (
    <DrawerWrapper>
      <MenuButton onClick={open} />
      <>
        {overlay.map(
          ({ item, key, props }) =>
            item && <DrawerOverlay key={key} style={props} onClick={close} />
        )}
        {drawer.map(
          ({ item, key, props }) =>
            item && (
              <Dmenu key={key} style={props}>
                <DrawerContent>
                  <DrawerContentWrapper
                    flexDirection="column"
                    bg="background.light"
                    p={3}
                  >
                    <CloseButton onClick={close} />
                  </DrawerContentWrapper>
                </DrawerContent>
              </Dmenu>
            )
        )}
      </>
    </DrawerWrapper>
  );
};

export { DrawerMenu };
