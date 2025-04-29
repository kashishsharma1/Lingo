import { getUserProgress } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { USerProgress } from "@/components/user-progress";
import { title } from "process";
import { redirect } from "next/navigation";

const LearnPage = async () => {

    const userProgressData = getUserProgress();

    const [
        userProgress
    ] = await Promise.all([
        userProgressData
    ]);

    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }

    return ( 
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <USerProgress
                    activeCourse={{ title: "Spanish", imageSrc: "/ES-Spain.svg"}}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                 />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Spanish"/>
            </FeedWrapper>
        </div>
    );
}
 
export default LearnPage;