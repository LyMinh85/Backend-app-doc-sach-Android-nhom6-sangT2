import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FirebaseCollection } from '../firebase/firebase-collection.enum';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { Notification } from './entities/notification.entity';
import { FieldValue } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
@Injectable()
export class NotificationService {

  private notificationCollection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(private firebaseRepository: FirebaseRepository) {
    this.notificationCollection = this.firebaseRepository.getCollection(
      FirebaseCollection.Notification,
    );
  }

  async createNotificationById(createNotificationDto: CreateNotificationDto, docId: string) {
    const snapshot = await this.notificationCollection.doc(docId).get();

      const data = snapshot.data();
      const keys = Object.keys(data);
      const lastKey = keys[keys.length - 1]; // Lấy giá trị key cuối cùng
      var lastKeyInt = parseInt(lastKey, 10); // Chuyển đổi lastKey sang kiểu số nguyên

      if (isNaN(lastKeyInt)) {
        lastKeyInt = -1;
      }

    const ref = this.notificationCollection.doc(docId);

    const notificationData = {
      [lastKeyInt + 1]: {
        title: createNotificationDto.title,
        content: createNotificationDto.content,
      },
    };

    await ref.update(notificationData);

    return 'This action adds a new notification';
  }

  async createIDNotification(idUser: string): Promise<string> {
    const ref = this.notificationCollection.doc(idUser);
    await ref.set({});
    return ref.id;
  }

  async findAllNotificationById(idUser: string): Promise<Notification[]> {
    const snapshot = await this.notificationCollection.doc(idUser).get();
    const notifications: Notification[] = [];

    if (snapshot.exists) {
      const data = snapshot.data();
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const { title, content } = data[key];
          const notification = new Notification({ key, title, content });
          notifications.push(notification);
        }
      }
    }

    return notifications;
  }

  async removeNotification(docId: string, mapKeys: string[]): Promise<void> {
    const docRef = this.notificationCollection.doc(docId);

    const updateData = mapKeys.reduce((acc, key) => {
      acc[key] = FieldValue.delete();
      return acc;
    }, {});

    await docRef.update(updateData);
  }

  // GỬI FCM tới các token có trong mảng
  async sendMultipleFCM(tokens: string[], createNotificationDto: CreateNotificationDto): Promise<void> {
    const message: admin.messaging.MulticastMessage = {
      tokens: tokens,
      data: {
        title: createNotificationDto.title,
        content: createNotificationDto.content,
      },
    };

    try {
      const response = await admin.messaging().sendMulticast(message);
      console.log('FCM multicast response:', response);
    } catch (error) {
      console.error('Error sending FCM multicast:', error);
      throw new Error('Failed to send FCM multicast');
    }
  }

  async sendFCMToTopics(topics: string[], title: string, body: string): Promise<void> {
    const message: admin.messaging.Message = {
      topic: topics.join(','), // Join các topic thành một chuỗi phân cách bằng dấu phẩy
      notification: {
        title: title,
        body: body,
      },
    };
  
    try {
      const response = await admin.messaging().send(message);
      console.log('FCM topic response:', response);
    } catch (error) {
      console.error('Error sending FCM to topics:', error);
      throw new Error('Failed to send FCM to topics');
    }
  }
}
