import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SessionType } from '../../shared/types/SessionType';

const { width } = Dimensions.get('window');

interface Session {
    session: SessionType;
}

interface Props {
    sessions: Session[];
}

const CarouselWithNextButton: React.FC<Props> = ({ sessions }) => {
    const carouselRef = useRef<Carousel>(null);

    const goToNextItem = () => {
        if (carouselRef.current) {
            carouselRef.current.snapToNext();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                ref={carouselRef}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                pagingEnabled={true}
                onSnapToItem={(index) => console.log(index)}
                width={width}
                data={sessions}
                renderItem={({ item, index }) => (
                    <View>
                        <Text>
                            {index + 1} / {sessions.length}
                        </Text>
                        {/* Remplacer par votre composant de carte */}
                    </View>
                )}
            />
            <TouchableOpacity onPress={goToNextItem} style={{ position: 'absolute', right: 10, bottom: 10 }}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CarouselWithNextButton;
