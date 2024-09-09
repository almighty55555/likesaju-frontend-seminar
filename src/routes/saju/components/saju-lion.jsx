import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { LoopRepeat } from 'three';
import lion from '../../../assets/lions/TalkFile_lion.glb.glb';
import * as THREE from 'three';

function Model({ step }) {
  const group = useRef();
  const { scene, animations } = useGLTF(lion);
  const modelRef = useRef();
  const mixer = useRef(null);

  useEffect(() => {
    // AnimationMixer 초기화
    mixer.current = new THREE.AnimationMixer(scene);

    // 초기 애니메이션을 재생하거나 설정할 수 있습니다.
    const initialAction = mixer.current.clipAction(
      animations.find((clip) => clip.name === 'Armature|ShakeHand'),
    );
    if (initialAction) {
      initialAction.play();
    }

    return () => {
      // 컴포넌트 언마운트 시 mixer 정리
      mixer.current.stopAllAction();
    };
  }, [scene, animations]);

  useEffect(() => {
    if (step === 0) {
      const shakeHandAction = mixer.current.clipAction(
        animations.find((clip) => clip.name === 'Armature|ShakeHand'),
      );
      if (shakeHandAction) {
        console.log('Playing ShakeHand action');
        // shakeHandAction.setLoop(LoopRepeat); // 애니메이션 반복 설정
        shakeHandAction.reset().play(); // 애니메이션 재생
      } else {
        console.log('ShakeHand action not found');
      }
    } else if (step === 1) {
      const thinkAction = mixer.current.clipAction(
        animations.find((clip) => clip.name === 'Armature|Think'),
      );
      if (thinkAction) {
        console.log('Playing Think action');
        thinkAction.reset().play();
      } else {
        console.log('Think action not found');
      }
    } else if (step === 2) {
      const completeAction = mixer.current.clipAction(
        animations.find((clip) => clip.name === 'Armature|Complete'),
      );
      if (completeAction) {
        console.log('Playing Complete action');
        completeAction.reset().play();
      } else {
        console.log('Complete action not found');
      }
    }
  }, [step]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.x = Math.PI / 2; // X축 기준으로 90도 회전
      modelRef.current.rotation.y = Math.PI; // Y축을 원래 상태로 유지
      modelRef.current.rotation.z = Math.PI / 2; // Z축 기준으로 180도 회전
      modelRef.current.position.y = -1.5; // Y축으로 -1.5만큼 이동
    }
    modelRef.current.scale.set(3, 3, 3);
    mixer.current?.update(delta);
  });

  return <primitive object={scene} ref={modelRef} />;
}

export const SajuLion = ({ step }) => {
  return (
    <div className="w-[615px]">
      <Canvas style={{ height: '600px' }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model step={step} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
