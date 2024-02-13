import { Skeleton } from "antd";
import { Wrapper, Content } from "../../pages/TimelineGrid/timelineGrid.styles";

const TimelineLoadingSkeleton = () => {
  const active = true;

  return (
    <Wrapper>
      <h3>Timeline</h3>
      <div className="divider"></div>
      <Content>
        <div style={{ width: "100%" }}>
          <h4 className="header-date">Photo Date Heading</h4>
        </div>
        <div>
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
        </div>

        <div style={{ width: "100%" }}>
          <h4 className="header-date">Photo Date Heading</h4>
        </div>
        <div>
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
        </div>
        <div style={{ width: "100%" }}>
          <h4 className="header-date">Photo Date Heading</h4>
        </div>
        <div>
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
          <Skeleton.Image active={active} />
        </div>
      </Content>
    </Wrapper>
  );
};

export default TimelineLoadingSkeleton;
